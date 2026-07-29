-- ============================================================
-- Reverse Aesthetics — Patient CRM
--
-- Deliberately a CRM and NOT a medical record. It holds who enquired, where
-- they came from, what they want, where they are in the funnel, what they had
-- done and what it cost. It holds no diagnoses, no clinical notes, no photos
-- and no medication history — that is sensitive data under the NDPA 2023 and
-- needs a consent, retention and access-logging story this app does not have.
-- If someone later asks for "just a small allergies field", that is the moment
-- to have the compliance conversation, not to add a column.
--
-- Two facts drive the whole design:
--
--   1. The phone number is the identity. Patients book on Cal with one number,
--      message WhatsApp from the same one, and give it again at the desk. Every
--      write path merges on `phone_e164` so one human is one row.
--
--   2. Nothing here is readable with the anon key. The two public write paths
--      (the shared intake link and the Cal webhook) go through security-definer
--      functions that only ever insert. Anon can call them; anon cannot read a
--      single patient row, and the functions return no patient data, so neither
--      can be turned into an enumeration oracle.
-- ============================================================

-- ------------------------------------------------------------
-- Phone normalisation
--
-- The merge key. Lives in SQL rather than TypeScript because three different
-- callers (intake RPC, Cal webhook, admin UI) must agree on it exactly —
-- if they ever disagree, one patient silently becomes two.
--
-- Immutable so it can back a generated column. Changing this function does NOT
-- recompute existing rows; a backfill has to be run by hand.
-- ------------------------------------------------------------
create or replace function public.normalize_phone(raw text)
returns text
language sql
immutable
-- Empty rather than a schema list: the body uses only pg_catalog builtins,
-- which stay resolvable, and nothing else can be shadowed into the path.
set search_path = ''
as $$
  with d as (
    select nullif(regexp_replace(coalesce(raw, ''), '[^0-9]', '', 'g'), '') as n
  )
  select case
    -- 0803… — how every Nigerian writes their own number
    when n is null                              then null
    when length(n) = 11 and left(n, 1) = '0'    then '+234' || right(n, 10)
    -- 803… — what is left after a form strips the leading zero
    when length(n) = 10                         then '+234' || n
    -- 234803… , with or without the plus Cal may or may not send
    when left(n, 3) = '234'                     then '+' || n
    -- Anything else is already international (a diaspora patient booking on a
    -- UK or US number). Never guess a country code for these.
    else '+' || n
  end
  from d;
$$;

comment on function public.normalize_phone(text) is
  'Nigeria-aware E.164 normaliser. The merge key for patient identity — every write path must use it.';

-- ------------------------------------------------------------
-- Patients
-- ------------------------------------------------------------
create table if not exists public.patients (
  id                 uuid primary key default gen_random_uuid(),

  -- Identity
  full_name          text not null,
  phone              text,                       -- exactly as it was typed
  phone_e164         text generated always as (public.normalize_phone(phone)) stored,
  email              text,
  gender             text check (gender in ('female', 'male', 'other', 'undisclosed')),
  date_of_birth      date,

  -- Which clinic they belong to. Nullable: an enquiry can arrive before the
  -- patient has decided which city they will actually attend.
  clinic             text check (clinic in ('lagos', 'abuja')),

  -- Acquisition — the whole point of the exercise. Without this the clinic
  -- cannot tell which of Instagram, Google Ads or the blog is paying for itself.
  source             text not null default 'other'
                       check (source in ('intake_link', 'cal_booking', 'whatsapp',
                                         'instagram', 'google', 'referral',
                                         'walk_in', 'blog', 'ad', 'other')),
  source_detail      text,                       -- "referred by Ada", campaign name
  landing_page       text,                       -- path they filled the form from
  utm                jsonb not null default '{}'::jsonb,

  -- Interest: ids from TREATMENTS[] in app/components/booking/bookingData.ts
  treatment_interest text[] not null default '{}',

  -- Funnel. Ordering matters — `stage_rank()` below relies on it so that an
  -- automated write can never demote someone who has already been treated.
  stage              text not null default 'lead'
                       check (stage in ('lead', 'contacted', 'consult_booked',
                                        'consulted', 'treated', 'repeat', 'dormant')),

  -- Consent (NDPA 2023). A patient row can exist without marketing consent —
  -- they asked us a question, that is legitimate interest. Sending them a
  -- broadcast is what needs the tick, so the timestamp is recorded separately.
  marketing_consent  boolean not null default false,
  consent_at         timestamptz,
  consent_source     text,

  -- Ops
  assigned_to        uuid references public.admin_users (user_id) on delete set null,
  tags               text[] not null default '{}',

  first_seen_at      timestamptz not null default now(),
  last_activity_at   timestamptz not null default now(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.patients is
  'Patient CRM directory. Non-clinical by design — see the header of 0004_patient_crm.sql before adding any medical column.';

-- One human, one row. Partial so walk-ins recorded without a number are still
-- allowed (they simply cannot be auto-merged later).
create unique index if not exists patients_phone_e164_key
  on public.patients (phone_e164) where phone_e164 is not null;

-- Same treatment for email, the fallback merge key when no phone was given.
create unique index if not exists patients_email_key
  on public.patients (lower(email)) where email is not null;

create index if not exists patients_stage_idx      on public.patients (stage);
create index if not exists patients_clinic_idx     on public.patients (clinic);
create index if not exists patients_source_idx     on public.patients (source);
create index if not exists patients_activity_idx   on public.patients (last_activity_at desc);
create index if not exists patients_interest_idx   on public.patients using gin (treatment_interest);

-- Name search from the admin list without a full scan. Front desk types "chid"
-- and expects Chidinma; a prefix index would not find her, so trigram it is.
create extension if not exists pg_trgm with schema extensions;

create index if not exists patients_name_trgm_idx
  on public.patients using gin (full_name extensions.gin_trgm_ops);

drop trigger if exists patients_touch_updated_at on public.patients;
create trigger patients_touch_updated_at
  before update on public.patients
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- Timeline
--
-- Append-only. Every automated merge drops a 'system' line here, so the front
-- desk can always see why a record changed without reading the audit log.
-- ------------------------------------------------------------
create table if not exists public.patient_notes (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid not null references public.patients (id) on delete cascade,
  kind        text not null default 'note'
                check (kind in ('note', 'call', 'whatsapp', 'email', 'visit',
                                'intake', 'system')),
  body        text not null,
  author_id   uuid references public.admin_users (user_id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists patient_notes_patient_idx
  on public.patient_notes (patient_id, created_at desc);

-- ------------------------------------------------------------
-- Appointments — mirrored from Cal.com, never authored here
--
-- Cal stays the source of truth for scheduling; this table exists so the CRM
-- can answer "who is coming in on Thursday" and "who booked and never showed"
-- without a round trip to two separate Cal accounts.
-- ------------------------------------------------------------
create table if not exists public.appointments (
  id               uuid primary key default gen_random_uuid(),
  patient_id       uuid references public.patients (id) on delete set null,

  cal_booking_uid  text unique,               -- the idempotency key for the webhook
  cal_event_slug   text,                      -- 'dermal-fillers', 'consultation', …
  clinic           text check (clinic in ('lagos', 'abuja')),

  title            text,
  treatment        text,                      -- the `treatment` select on the Cal event
  starts_at        timestamptz not null,
  ends_at          timestamptz,

  status           text not null default 'confirmed'
                     check (status in ('confirmed', 'pending', 'cancelled',
                                       'rescheduled', 'completed', 'no_show')),

  -- Kept verbatim as booked, even after the patient row is edited, so a
  -- mis-merge can always be unpicked.
  attendee_name    text,
  attendee_email   text,
  attendee_phone   text,

  raw              jsonb,                     -- the webhook payload, for debugging
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists appointments_patient_idx on public.appointments (patient_id, starts_at desc);
create index if not exists appointments_starts_idx  on public.appointments (starts_at desc);
create index if not exists appointments_status_idx  on public.appointments (status);

drop trigger if exists appointments_touch_updated_at on public.appointments;
create trigger appointments_touch_updated_at
  before update on public.appointments
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- Visits — what was actually done, and what it was worth
--
-- This is what makes the CRM pay for itself: `recall_weeks` turns a one-off
-- treatment into a scheduled reason to call someone back. Fillers fade at
-- 6-12 months, hair restoration runs as a course, glass skin is effectively a
-- subscription — none of that gets chased today because nothing records it.
-- ------------------------------------------------------------
create table if not exists public.visits (
  id            uuid primary key default gen_random_uuid(),
  patient_id    uuid not null references public.patients (id) on delete cascade,

  treatment     text not null,               -- TREATMENTS id, or free text
  clinic        text check (clinic in ('lagos', 'abuja')),
  performed_at  date not null default current_date,
  practitioner  text,

  amount        numeric(12, 2) not null default 0,   -- naira
  recall_weeks  integer,                     -- null = no recall for this one

  -- Non-clinical only: "wants to redo before December", not "3ml to cheeks".
  notes         text,
  created_at    timestamptz not null default now()
);

create index if not exists visits_patient_idx on public.visits (patient_id, performed_at desc);
create index if not exists visits_date_idx    on public.visits (performed_at desc);

-- ------------------------------------------------------------
-- Secrets
--
-- Holds the shared token the Cal webhook presents to `ingest_cal_booking`.
-- RLS on with no policies at all — deny-all for anon and authenticated alike,
-- the same pattern 0003 used for n8n_chat_histories. Only security-definer
-- functions, which run as the owner, can read it.
--
-- The token itself is NOT in this file. It is generated and inserted directly
-- against the database so it never enters git.
-- ------------------------------------------------------------
create table if not exists public.app_secrets (
  key        text primary key,
  value      text not null,
  created_at timestamptz not null default now()
);

alter table public.app_secrets enable row level security;
revoke all on public.app_secrets from anon, authenticated;

-- ------------------------------------------------------------
-- Row level security
--
-- Staff-only, wholesale. There is no public read policy on any of these tables
-- because there is no public read of any of them — the intake form writes and
-- forgets, and the patient never sees their own record back.
-- ------------------------------------------------------------
alter table public.patients     enable row level security;
alter table public.patient_notes enable row level security;
alter table public.appointments enable row level security;
alter table public.visits       enable row level security;

drop policy if exists "admins use patients" on public.patients;
create policy "admins use patients" on public.patients
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins use patient notes" on public.patient_notes;
create policy "admins use patient notes" on public.patient_notes
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins use appointments" on public.appointments;
create policy "admins use appointments" on public.appointments
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins use visits" on public.visits;
create policy "admins use visits" on public.visits
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- Directory view — one round trip for the admin list
--
-- security_invoker so the policies above still apply; without it the view runs
-- as its owner and would hand every patient row to anyone who asked.
-- ------------------------------------------------------------
create or replace view public.patient_directory
with (security_invoker = on) as
select
  p.*,
  coalesce(v.visit_count, 0)    as visit_count,
  coalesce(v.total_spend, 0)    as total_spend,
  v.last_visit_on,
  v.recall_due_on,
  a.next_appointment_at
from public.patients p
left join lateral (
  select
    count(*)                as visit_count,
    sum(amount)             as total_spend,
    max(performed_at)       as last_visit_on,
    -- The latest date any past visit asks us to call them back. Taking the max
    -- across all visits rather than only the newest one is deliberate: a
    -- 12-month filler recall should still stand behind a facial two weeks ago.
    max((performed_at + (coalesce(recall_weeks, 0) * interval '1 week'))::date)
      filter (where recall_weeks is not null) as recall_due_on
  from public.visits
  where patient_id = p.id
) v on true
left join lateral (
  select min(starts_at) as next_appointment_at
  from public.appointments
  where patient_id = p.id
    and starts_at > now()
    and status in ('confirmed', 'pending')
) a on true;

comment on view public.patient_directory is
  'patients plus visit/spend rollups and next appointment. Read-only convenience for the admin list.';

-- ------------------------------------------------------------
-- Stage ranking
--
-- Automated writes may promote a patient but must never demote one. Someone
-- who has been treated twice does not go back to "lead" because they filled
-- the intake link again from a new phone.
-- ------------------------------------------------------------
create or replace function public.stage_rank(stage text)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case stage
    when 'lead'           then 0
    when 'contacted'      then 1
    when 'consult_booked' then 2
    when 'consulted'      then 3
    when 'treated'        then 4
    when 'repeat'         then 5
    when 'dormant'        then -1   -- never reached by promotion; set by hand
    else 0
  end;
$$;

-- ------------------------------------------------------------
-- Merge helper
--
-- The single place a patient row is created or matched. Both public write
-- paths funnel through it so they cannot drift apart.
--
-- Merge order: phone first (the reliable key), then email. Blank incoming
-- fields never overwrite populated ones — a Cal booking that omits the city
-- must not erase a city the front desk typed in.
-- ------------------------------------------------------------
create or replace function public.merge_patient(
  p_full_name  text,
  p_phone      text,
  p_email      text,
  p_clinic     text default null,
  p_source     text default 'other',
  p_treatments text[] default '{}',
  p_min_stage  text default 'lead'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_phone text := public.normalize_phone(p_phone);
  v_email text := lower(nullif(trim(p_email), ''));
  v_name  text := nullif(trim(p_full_name), '');
  v_id    uuid;
begin
  if v_name is null then
    raise exception 'a name is required' using errcode = 'check_violation';
  end if;

  if v_phone is null and v_email is null then
    raise exception 'a phone number or email is required' using errcode = 'check_violation';
  end if;

  select id into v_id from public.patients
   where phone_e164 is not null and phone_e164 = v_phone
   limit 1;

  if v_id is null and v_email is not null then
    select id into v_id from public.patients
     where email is not null and lower(email) = v_email
     limit 1;
  end if;

  if v_id is null then
    begin
      insert into public.patients (full_name, phone, email, clinic, source,
                                   treatment_interest, stage)
      values (v_name, nullif(trim(p_phone), ''), v_email, p_clinic,
              coalesce(p_source, 'other'), coalesce(p_treatments, '{}'),
              coalesce(p_min_stage, 'lead'))
      returning id into v_id;

      return v_id;
    exception when unique_violation then
      -- Two submissions for the same new patient landing at once. The other
      -- one won the insert; fall through and treat this as an update of it.
      select id into v_id from public.patients
       where (phone_e164 is not null and phone_e164 = v_phone)
          or (v_email is not null and lower(email) = v_email)
       limit 1;

      if v_id is null then raise; end if;
    end;
  end if;

  update public.patients set
    -- Fill gaps only. The exception is the name: the patient typing it
    -- themselves beats whatever a staff member guessed from a WhatsApp handle.
    full_name          = coalesce(v_name, full_name),
    phone              = coalesce(phone, nullif(trim(p_phone), '')),
    email              = coalesce(email, v_email),
    clinic             = coalesce(clinic, p_clinic),
    treatment_interest = (
      select coalesce(array_agg(distinct t), '{}')
      from unnest(treatment_interest || coalesce(p_treatments, '{}')) as t
    ),
    stage              = case
                           when public.stage_rank(p_min_stage) > public.stage_rank(stage)
                           then p_min_stage else stage
                         end,
    last_activity_at   = now()
  where id = v_id;

  return v_id;
end;
$$;

-- Internal only. Both public entry points call it as the definer, so nothing
-- outside the database ever needs execute on it.
--
-- anon and authenticated are named explicitly, not left to `from public`:
-- Supabase's default privileges grant EXECUTE on new functions in this schema
-- to those two roles directly, so revoking from PUBLIC alone leaves them with
-- it. That matters here because this function returns the patient's uuid —
-- reachable by anon, it would answer "is this phone number already a patient?"
revoke all on function public.merge_patient(text, text, text, text, text, text[], text)
  from public, anon, authenticated;

-- ------------------------------------------------------------
-- Public write path 1 — the shared intake link
--
-- The clinic pastes one URL into a WhatsApp reply; the patient fills it in and
-- lands in the directory. Callable by anon by necessity, which is the whole
-- threat model: someone with the anon key can submit junk leads. That is true
-- of any public form. What they cannot do is read anything back — the function
-- returns a bare {ok:true}, never an id, so it cannot be used to test whether
-- a given phone number is already a patient.
-- ------------------------------------------------------------
create or replace function public.submit_intake(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id      uuid;
  v_message text := nullif(trim(payload ->> 'message'), '');
  v_consent boolean := coalesce((payload ->> 'marketing_consent')::boolean, false);
  v_recent  boolean;
begin
  v_id := public.merge_patient(
    payload ->> 'full_name',
    payload ->> 'phone',
    payload ->> 'email',
    nullif(payload ->> 'clinic', ''),
    'intake_link',
    coalesce(
      (select array_agg(value::text)
         from jsonb_array_elements_text(coalesce(payload -> 'treatment_interest', '[]'::jsonb)) as value),
      '{}'
    ),
    'lead'
  );

  -- Double-tap guard. A patient who taps submit twice, or a form retried on a
  -- flaky Lagos connection, should not produce two identical timeline entries.
  select exists (
    select 1 from public.patient_notes
     where patient_id = v_id and kind = 'intake'
       and created_at > now() - interval '2 minutes'
  ) into v_recent;

  if v_recent then
    return jsonb_build_object('ok', true);
  end if;

  update public.patients set
    gender            = coalesce(nullif(payload ->> 'gender', ''), gender),
    date_of_birth     = coalesce((nullif(payload ->> 'date_of_birth', ''))::date, date_of_birth),
    landing_page      = coalesce(nullif(payload ->> 'landing_page', ''), landing_page),
    source_detail     = coalesce(nullif(payload ->> 'source_detail', ''), source_detail),
    utm               = case when payload -> 'utm' is null then utm else payload -> 'utm' end,
    -- Consent is a latch: ticking it records when, un-ticking it later is a
    -- withdrawal the staff must action, not something a blank form resubmit does.
    marketing_consent = marketing_consent or v_consent,
    consent_at        = case
                          when v_consent and consent_at is null then now()
                          else consent_at
                        end,
    consent_source    = case
                          when v_consent and consent_source is null then 'intake_link'
                          else consent_source
                        end,
    last_activity_at  = now()
  where id = v_id;

  insert into public.patient_notes (patient_id, kind, body)
  values (
    v_id,
    'intake',
    coalesce(v_message, 'Completed the intake form.')
  );

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.submit_intake(jsonb) from public;
grant execute on function public.submit_intake(jsonb) to anon, authenticated;

-- ------------------------------------------------------------
-- Public write path 2 — the Cal.com webhook
--
-- Same reasoning as above, plus a shared token, because unlike the intake form
-- there is no legitimate reason for a stranger to reach this at all. The route
-- handler verifies Cal's own HMAC signature first; this token is the second
-- lock, so a leaked anon key alone cannot forge appointments.
--
-- The route flattens Cal's payload before calling — parsing two Cal accounts'
-- booking shapes belongs in TypeScript, merging belongs here.
-- ------------------------------------------------------------
create or replace function public.ingest_cal_booking(payload jsonb, token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_expected text;
  v_id       uuid;
  v_uid      text := nullif(payload ->> 'cal_booking_uid', '');
  v_event    text := upper(coalesce(payload ->> 'event', 'BOOKING_CREATED'));
  v_status   text;
  v_existing uuid;
begin
  select value into v_expected from public.app_secrets where key = 'cal_webhook_token';

  -- No token configured means the webhook is not commissioned yet; refuse
  -- rather than silently accepting anonymous writes.
  if v_expected is null or token is null or token <> v_expected then
    raise exception 'unauthorised' using errcode = 'insufficient_privilege';
  end if;

  if v_uid is null then
    raise exception 'cal_booking_uid is required' using errcode = 'check_violation';
  end if;

  v_status := case v_event
    when 'BOOKING_CANCELLED'   then 'cancelled'
    when 'BOOKING_REJECTED'    then 'cancelled'
    when 'BOOKING_RESCHEDULED' then 'rescheduled'
    when 'BOOKING_REQUESTED'   then 'pending'
    when 'BOOKING_NO_SHOW_UPDATED' then 'no_show'
    else 'confirmed'
  end;

  -- A cancellation for a booking we never saw is not worth inventing a patient
  -- for; update if present, otherwise fall through and record it anyway so the
  -- row exists if the create event arrives out of order.
  select patient_id into v_existing from public.appointments where cal_booking_uid = v_uid;

  if v_existing is not null then
    v_id := v_existing;
  elsif v_status <> 'cancelled' then
    v_id := public.merge_patient(
      payload ->> 'name',
      payload ->> 'phone',
      payload ->> 'email',
      nullif(payload ->> 'clinic', ''),
      'cal_booking',
      '{}',
      'consult_booked'
    );
  end if;

  insert into public.appointments (
    patient_id, cal_booking_uid, cal_event_slug, clinic, title, treatment,
    starts_at, ends_at, status, attendee_name, attendee_email, attendee_phone, raw
  ) values (
    v_id, v_uid,
    nullif(payload ->> 'cal_event_slug', ''),
    nullif(payload ->> 'clinic', ''),
    nullif(payload ->> 'title', ''),
    nullif(payload ->> 'treatment', ''),
    coalesce((payload ->> 'starts_at')::timestamptz, now()),
    (nullif(payload ->> 'ends_at', ''))::timestamptz,
    v_status,
    nullif(payload ->> 'name', ''),
    nullif(payload ->> 'email', ''),
    nullif(payload ->> 'phone', ''),
    payload -> 'raw'
  )
  on conflict (cal_booking_uid) do update set
    status         = excluded.status,
    starts_at      = excluded.starts_at,
    ends_at        = excluded.ends_at,
    treatment      = coalesce(excluded.treatment, public.appointments.treatment),
    cal_event_slug = coalesce(excluded.cal_event_slug, public.appointments.cal_event_slug),
    patient_id     = coalesce(public.appointments.patient_id, excluded.patient_id),
    raw            = excluded.raw,
    updated_at     = now();

  if v_id is not null then
    insert into public.patient_notes (patient_id, kind, body)
    values (
      v_id,
      'system',
      case v_status
        when 'cancelled'   then 'Cancelled their booking on Cal.com.'
        when 'rescheduled' then 'Rescheduled their booking on Cal.com.'
        when 'no_show'     then 'Marked as a no-show on Cal.com.'
        else 'Booked ' || coalesce(nullif(payload ->> 'treatment', ''), 'an appointment')
             || ' via Cal.com.'
      end
    );

    update public.patients set last_activity_at = now() where id = v_id;
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.ingest_cal_booking(jsonb, text) from public;
grant execute on function public.ingest_cal_booking(jsonb, text) to anon, authenticated;
