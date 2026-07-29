-- ============================================================
-- Reverse Aesthetics — fix seated bookings losing patients
--
-- Five of the six Cal event types have seatsPerTimeSlot = 3: three patients
-- share one 10:00 dermal fillers slot. Cal fires one webhook per seat, each
-- carrying only that seat's attendee, and gives each seat a `seatUid` that is
-- distinct from the booking `uid`.
--
-- 0004 keyed appointments on the booking uid alone and, when it found an
-- existing row for that uid, reused that row's patient_id instead of reading
-- the payload. If Cal shares the booking uid across seats, the second and
-- third patients in every slot were silently discarded — the appointment row
-- was overwritten and their booking was filed against the first patient. Up to
-- two in every three bookings would never reach the directory, with no error.
--
-- Two changes:
--
--   1. The appointment key is the seat uid when there is one, so each seat
--      gets its own row. Falls back to the booking uid for unseated events.
--
--   2. Identity always comes from the payload. Every webhook describes the
--      person who booked, so there is never a reason to infer them from a row
--      that happens to share a key. The existing row is only used as a
--      fallback for cancellations, which must not invent a patient.
--
-- Correct whether or not Cal shares the booking uid between seats.
-- ============================================================

create or replace function public.ingest_cal_booking(payload jsonb, token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_expected text;
  v_id       uuid;
  -- The seat uid identifies the person; the booking uid identifies the slot.
  -- Prefer the former so three patients in one slot are three rows.
  v_uid      text := coalesce(
                       nullif(payload ->> 'cal_seat_uid', ''),
                       nullif(payload ->> 'cal_booking_uid', '')
                     );
  v_event    text := upper(coalesce(payload ->> 'event', 'BOOKING_CREATED'));
  v_status   text;
  v_existing uuid;
  v_name     text := nullif(trim(payload ->> 'name'), '');
  v_phone    text := public.normalize_phone(payload ->> 'phone');
  v_email    text := nullif(trim(payload ->> 'email'), '');
begin
  select value into v_expected from public.app_secrets where key = 'cal_webhook_token';

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

  select patient_id into v_existing from public.appointments where cal_booking_uid = v_uid;

  -- Identity comes from this webhook's own attendee, not from whatever patient
  -- an existing row points at. A returning patient is matched on their phone
  -- inside merge_patient, so this creates nothing new for them — it just makes
  -- sure the right person is credited with the right booking.
  if v_status <> 'cancelled'
     and v_name is not null
     and (v_phone is not null or v_email is not null) then
    v_id := public.merge_patient(
      v_name, payload ->> 'phone', v_email,
      nullif(payload ->> 'clinic', ''), 'cal_booking', '{}', 'consult_booked'
    );
  else
    -- A cancellation, or a payload with no usable identity. Never invent a
    -- patient from one of these; fall back to whoever the row already knows.
    v_id := v_existing;
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
    v_name,
    v_email,
    nullif(payload ->> 'phone', ''),
    payload -> 'raw'
  )
  on conflict (cal_booking_uid) do update set
    status         = excluded.status,
    starts_at      = excluded.starts_at,
    ends_at        = excluded.ends_at,
    treatment      = coalesce(excluded.treatment, public.appointments.treatment),
    cal_event_slug = coalesce(excluded.cal_event_slug, public.appointments.cal_event_slug),
    patient_id     = coalesce(excluded.patient_id, public.appointments.patient_id),
    raw            = excluded.raw,
    updated_at     = now();

  if v_id is not null then
    insert into public.patient_notes (patient_id, kind, body)
    values (v_id, 'system', case v_status
      when 'cancelled'   then 'Cancelled their booking on Cal.com.'
      when 'rescheduled' then 'Rescheduled their booking on Cal.com.'
      when 'no_show'     then 'Marked as a no-show on Cal.com.'
      else 'Booked ' || coalesce(nullif(payload ->> 'treatment', ''), 'an appointment') || ' via Cal.com.'
    end);

    update public.patients set last_activity_at = now() where id = v_id;
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.ingest_cal_booking(jsonb, text) from public, anon, authenticated;
grant execute on function public.ingest_cal_booking(jsonb, text) to anon, authenticated;
