"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * The site's background field — drifting violet filaments with light travelling
 * along them, over the existing warm cream and a soft aurora bloom.
 *
 * Purple lives here and nowhere else: every foreground colour on the site stays
 * teal and charcoal. The strand motif is the material the clinic works in — PDO
 * threads, collagen fibre, hair — so it reads as the brand rather than as decor.
 *
 * Drop it in as the first child of a `relative` page wrapper that carries the
 * `thread-page` class, and keep page content above it with `relative z-10`.
 * Everything is fixed, so it costs nothing per section and never scrolls away.
 *
 * Performance notes, all of them load-bearing — see git history for measurements:
 *  - Layers animate by transform only. Any scale forces a full re-rasterisation
 *    of the vector layer every frame.
 *  - Parallax and sway are combined into one transform per depth, so each depth
 *    is one compositor layer rather than two.
 *  - The travelling light is small elements moved by transform, NOT an animated
 *    stroke-dashoffset, which repaints the whole layer every frame.
 */

const VIOLET = "#8557C6";
const PERI = "#6C6BC0";
const CYAN = "#019EA4";

/** How present the field is. One dial; 1 reads as too much purple. */
const INTENSITY = 0.62;

/* --- geometry ------------------------------------------------------------- */

/** Seeded PRNG — paths must be identical on server and client. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Catmull-Rom through the sampled points — smoother than raw quadratics. */
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(
      1
    )},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

type StrandParams = {
  x0: number;
  amp: number;
  wave: number;
  phase: number;
  lean: number;
};

const Y0 = -700;
const Y1 = 2700;
const Y_SPAN = Y1 - Y0;

/** The strand's x at a given y, in SVG user space. */
function strandX(p: StrandParams, y: number) {
  return (
    p.x0 +
    (p.lean * y) / 1000 +
    p.amp * Math.sin(y / p.wave + p.phase) +
    p.amp * 0.42 * Math.sin(y / (p.wave * 0.43) + p.phase * 1.7) +
    p.amp * 0.17 * Math.sin(y / (p.wave * 0.19) + p.phase * 2.9)
  );
}

/**
 * Three summed sines — one wave alone reads as decoration, three read as fibre.
 * `lean` tilts the strand off vertical; without it a field of these reads as
 * wavy lines rather than something flowing past.
 */
function strandPath(p: StrandParams, step = 70) {
  const pts: [number, number][] = [];
  for (let y = Y0; y <= Y1; y += step) pts.push([strandX(p, y), y]);
  return smoothPath(pts);
}

/* --- the fibre-optic bundle ----------------------------------------------- */

type LayerSpec = {
  count: number;
  amp: [number, number];
  wave: [number, number];
  width: number;
  opacity: number;
  /** Parallax travel in px across the full page scroll. */
  range: number;
  /** Sway period in seconds. */
  sway: number;
  pulses: boolean;
  /** Wide translucent under-stroke. Costly, so only the heaviest layer gets it. */
  glow: boolean;
};

const LAYERS: LayerSpec[] = [
  { count: 10, amp: [30, 60], wave: [300, 460], width: 0.8, opacity: 0.3, range: 60, sway: 27, pulses: false, glow: false },
  { count: 8, amp: [45, 85], wave: [280, 420], width: 1.2, opacity: 0.4, range: 150, sway: 19, pulses: true, glow: false },
  { count: 5, amp: [60, 110], wave: [260, 380], width: 1.9, opacity: 0.5, range: 285, sway: 14, pulses: true, glow: true },
];

export default function ThreadBackdrop() {
  const strands = useMemo(() => {
    const rnd = mulberry32(0x5e7);
    return LAYERS.map((layer) =>
      Array.from({ length: layer.count }, (_, i) => {
        // Bias strands away from dead-centre so the reading column stays calm.
        const t = (i + 0.5) / layer.count;
        const skew = t < 0.5 ? t * 0.86 : 0.14 + t * 0.86;
        const x = 60 + skew * 1320 + (rnd() - 0.5) * 90;
        const amp = layer.amp[0] + rnd() * (layer.amp[1] - layer.amp[0]);
        const wave = layer.wave[0] + rnd() * (layer.wave[1] - layer.wave[0]);
        const phase = rnd() * Math.PI * 2;
        // Strands lean the same general way, with enough spread that a few
        // cross the rest — that crossing is what makes it read as a bundle.
        const lean = 90 + rnd() * 230 - (i % 3 === 0 ? 300 : 0);
        const params: StrandParams = { x0: x, amp, wave, phase, lean };
        return {
          params,
          d: strandPath(params),
          gradIndex: i % 3,
          // Uniform weight looks printed; varied weight looks spun.
          weight: 0.55 + rnd() * 1.15,
        };
      })
    );
  }, []);

  const dots = useMemo(() => {
    const rnd = mulberry32(0x1d07);
    const out: {
      li: number;
      params: StrandParams;
      speed: number;
      seed: number;
      size: number;
    }[] = [];
    LAYERS.forEach((layer, li) => {
      if (!layer.pulses) return;
      strands[li].forEach((s, i) => {
        if (i % 2 !== 0) return;
        out.push({
          li,
          params: s.params,
          speed: 0.75 + rnd() * 0.7,
          seed: rnd(),
          size: 5 + rnd() * 5,
        });
      });
    });
    return out;
  }, [strands]);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Phones and low-core machines shed the wide under-stroke (the priciest
    // thing to rasterise) and half the travelling lights. Done by hiding nodes
    // rather than rendering fewer, so server and client markup always match.
    const compact =
      window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const hidden = (i: number) => compact && i % 2 === 1;
    document
      .querySelectorAll<SVGPathElement>("[data-tb-glow]")
      .forEach((el) => (el.style.display = compact ? "none" : ""));
    dotRefs.current.forEach((el, i) => {
      if (el) el.style.display = hidden(i) ? "none" : "";
    });

    let raf = 0;
    let last = performance.now();
    let flow = 0;
    let smoothVel = 0;
    let prevY = window.scrollY;

    // The viewBox -> pixel mapping for preserveAspectRatio="xMidYMid slice".
    // Computed by hand rather than via getScreenCTM so the ancestor parallax and
    // sway transforms don't contaminate it — the dots live inside them.
    let scale = 1;
    let tx = 0;
    let ty = 0;
    let swayAmp = 20;
    const remap = () => {
      const el = fieldRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      scale = Math.max(w / 1440, h / 2000);
      tx = (w - 1440 * scale) / 2;
      ty = (h - 2000 * scale) / 2;
      swayAmp = w * 0.018;
    };
    remap();
    window.addEventListener("resize", remap);

    const place = (i: number, uy: number) => {
      const el = dotRefs.current[i];
      const dot = dots[i];
      if (!el || !dot || hidden(i)) return;
      const ux = strandX(dot.params, uy);
      // Tangent, so the streak lies along the fibre instead of across it.
      const angle =
        (Math.atan2(12, strandX(dot.params, uy + 12) - ux) * 180) / Math.PI - 90;
      el.style.transform = `translate3d(${(tx + ux * scale).toFixed(1)}px,${(
        ty +
        uy * scale
      ).toFixed(1)}px,0) rotate(${angle.toFixed(1)}deg)`;
    };

    // Dots move by transform, so without a frame loop they'd pile up at the
    // origin. Place them once and leave them still.
    if (reduced) {
      dots.forEach((dot, i) => place(i, Y0 + dot.seed * Y_SPAN));
      return () => window.removeEventListener("resize", remap);
    }

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      const y = window.scrollY;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(1, y / max);

      // Velocity in px/s, heavily smoothed so a flick doesn't snap the light.
      const rawVel = (y - prevY) / Math.max(dt, 0.001);
      prevY = y;
      smoothVel += (rawVel - smoothVel) * Math.min(1, dt * 6);

      // Baseline drift, plus a surge proportional to how fast you're scrolling.
      flow += (90 + Math.min(2600, Math.abs(smoothVel)) * 1.15) * dt;

      LAYERS.forEach((layer, li) => {
        const el = layerRefs.current[li];
        if (!el) return;
        const sway =
          Math.sin((now / 1000) * ((Math.PI * 2) / layer.sway) + li * 1.7) * swayAmp;
        el.style.transform = `translate3d(${sway.toFixed(1)}px,${(
          -progress * layer.range
        ).toFixed(2)}px,0)`;
      });

      dots.forEach((dot, i) => {
        // Wrap through the full span so a dot never pops in mid-screen.
        place(i, Y0 + ((flow * dot.speed + dot.seed * Y_SPAN) % Y_SPAN));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", remap);
    };
  }, [dots]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Base — the site's existing warm cream, painted here so pages don't
          need their own background and the field is never covered. */}
      <div className="absolute inset-0 bg-[var(--color-clinic-hero-top)]" />

      {/* Aurora bloom */}
      <div
        className="absolute -left-[14%] -top-[22%] h-[760px] w-[760px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(133,87,198,.34) 0%,rgba(133,87,198,.12) 42%,rgba(133,87,198,0) 70%)",
          filter: "blur(26px)",
        }}
      />
      <div
        className="absolute -right-[10%] top-[8%] h-[620px] w-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(1,158,164,.24) 0%,rgba(1,158,164,.08) 45%,rgba(1,158,164,0) 70%)",
          filter: "blur(26px)",
        }}
      />

      {/* Strand field. Oversized below, since parallax only ever pulls it up. */}
      <div
        ref={fieldRef}
        className="absolute inset-x-0 -top-[60px] -bottom-[320px] overflow-hidden"
      >
        {LAYERS.map((layer, li) => (
          <div
            key={li}
            ref={(el) => {
              layerRefs.current[li] = el;
            }}
            className="absolute inset-0 will-change-transform"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1440 2000"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              <defs>
                <linearGradient id={`tb-g${li}-0`} x1="0" y1="0" x2="0.35" y2="1">
                  <stop offset="0%" stopColor={VIOLET} stopOpacity="0" />
                  <stop offset="22%" stopColor={VIOLET} stopOpacity="1" />
                  <stop offset="62%" stopColor={PERI} stopOpacity="1" />
                  <stop offset="100%" stopColor={CYAN} stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id={`tb-g${li}-1`} x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor={CYAN} stopOpacity="0.1" />
                  <stop offset="38%" stopColor={PERI} stopOpacity="1" />
                  <stop offset="100%" stopColor={VIOLET} stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id={`tb-g${li}-2`} x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0%" stopColor={VIOLET} stopOpacity="0.15" />
                  <stop offset="50%" stopColor={VIOLET} stopOpacity="1" />
                  <stop offset="100%" stopColor={VIOLET} stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <g opacity={layer.opacity * INTENSITY}>
                {strands[li].map((s, i) => {
                  const stroke = `url(#tb-g${li}-${s.gradIndex})`;
                  return (
                    <g key={i}>
                      {layer.glow && (
                        <path
                          data-tb-glow=""
                          d={s.d}
                          stroke={stroke}
                          strokeWidth={layer.width * s.weight * 3.5}
                          strokeOpacity={0.2}
                          strokeLinecap="round"
                        />
                      )}
                      <path
                        d={s.d}
                        stroke={stroke}
                        strokeWidth={layer.width * s.weight}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Travelling light. Positioned at the origin and moved purely by
                transform, so each is its own small compositor layer. */}
            {dots.map((dot, gi) =>
              dot.li !== li ? null : (
                <div
                  key={gi}
                  data-tb-dot=""
                  ref={(el) => {
                    dotRefs.current[gi] = el;
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{
                    width: dot.size,
                    height: dot.size * 5.5,
                    marginLeft: -dot.size / 2,
                    marginTop: -dot.size * 2.75,
                    borderRadius: "999px",
                    opacity: (layer.opacity + 0.28) * INTENSITY,
                    background:
                      "linear-gradient(180deg,rgba(133,87,198,0) 0%,#8B4FDA 42%,#C9A7FF 62%,rgba(201,167,255,0) 100%)",
                  }}
                />
              )
            )}
          </div>
        ))}
      </div>

      {/* Keeps the reading column calm while the margins stay alive. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 42%,rgba(248,246,242,.86) 0%,rgba(248,246,242,.46) 55%,rgba(248,246,242,0) 100%)",
        }}
      />

      {/* Grain, so the gradients don't band on a wide monitor. */}
      <div
        className="absolute inset-0 opacity-[.15]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
