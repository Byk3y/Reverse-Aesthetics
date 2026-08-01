/**
 * Shown the instant "Book Appointment" is tapped.
 *
 * There was no loading state anywhere in the app, so between the tap and the
 * booking page painting, Next kept the old page on screen and nothing moved.
 * On a phone that reads as a broken button, and the usual response is to tap it
 * again. Making the route static cut most of the wait; this covers what's left
 * on a slow connection, and it deliberately mirrors the wizard's own shell so
 * the real page settles into place rather than replacing something different.
 */
export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-clinic-warm-bg)]">
      <header className="sticky top-0 z-50 border-b border-[rgba(35,32,29,0.08)] bg-[var(--color-clinic-warm-bg)]">
        <div className="mx-auto flex max-w-[725px] items-center justify-between px-5 py-[14px]">
          <div className="h-[32px] w-[145px] rounded-[6px] bg-[rgba(35,32,29,0.07)]" />
          <div className="h-[15px] w-[74px] rounded-full bg-[rgba(35,32,29,0.07)]" />
        </div>
        <div className="flex items-center justify-center gap-[8px] px-5 pb-[16px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[6px] w-[46px] rounded-full bg-[rgba(35,32,29,0.09)]"
            />
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-[725px] px-5 pt-[34px]">
        <div className="mx-auto mb-[10px] h-[26px] w-[62%] rounded-[8px] bg-[rgba(35,32,29,0.08)]" />
        <div className="mx-auto mb-[30px] h-[16px] w-[44%] rounded-[8px] bg-[rgba(35,32,29,0.06)]" />
        <div className="grid gap-[14px]">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-[92px] rounded-[16px] border border-[rgba(35,32,29,0.08)] bg-white/60"
            />
          ))}
        </div>
      </div>

      <span className="sr-only" role="status">
        Loading the booking form
      </span>
    </div>
  );
}
