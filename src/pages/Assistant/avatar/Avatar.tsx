import React, { useEffect, useRef, useState } from "react";

/**
 * Human-ish emoji avatar with body motion while speaking.
 * Props:
 *  - open : boolean  (lip-sync signal)
 *  - wave : boolean  (first-greet wrist/palm wave)
 *  - size : number   (overall width in px; height ≈ size * 1.9)
 *
 * Usage:
 *   <EmojiAvatar open={speech.open} wave={firstWave} size={160} />
 */
export default function EmojiAvatar({ open = false, wave = false, size = 160 }) {
  // Smooth "talking" so brief gaps don't stop body animation immediately
  const [talking, setTalking] = useState(false);

  /** Timer ref without TS generics (JS-only): store inside an object */
  /** @type {{ id: number | null }} */
  const offTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

useEffect(() => {
  if (open) {
    if (offTimer.current) {
      clearTimeout(offTimer.current);
      offTimer.current = null;
    }
    setTalking(true);
  } else {
    if (offTimer.current) clearTimeout(offTimer.current);
    offTimer.current = setTimeout(() => setTalking(false), 220);
  }

  // cleanup: do the side-effect, return void
  return () => {
    if (offTimer.current) {
      clearTimeout(offTimer.current);
      offTimer.current = null;
    }
  };
}, [open]);

  // Lip-sync smoothing: lerp mouth openness toward target (0..1)
  const [mouthVal, setMouthVal] = useState(0);
  useEffect(() => {
    let rafId = 0;
    const target = open ? 1 : 0;
    const animate = () => {
      setMouthVal((prev) => {
        const next = prev + (target - prev) * 0.35; // smoothing factor
        if (Math.abs(next - target) < 0.003) return target;
        rafId = requestAnimationFrame(animate);
        return next;
      });
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [open]);

  // Mouth shape derived from mouthVal (0..1)
  const mouthHeight = 4 + mouthVal * 12; // 4..16
  const mouthWidth = 36 - mouthVal * 6;  // narrows slightly when open for a more natural look
  const mouthX = 42 + (36 - mouthWidth) / 2;

  // Sizing
  const height = Math.round(size * 1.9); // taller silhouette
  const svgClass = talking ? "ea-svg ea-talking" : "ea-svg";
  const handClass = wave ? "ea-hand ea-wave" : "ea-hand";

  return (
    <div style={{ display: "grid", placeItems: "center", width: size, height }}>
      <style>{`
        /* ===== Pivots ===== */
        .ea-armL, .ea-armR, .ea-legL, .ea-legR, .ea-torso, .ea-hand, .ea-head {
          transform-box: fill-box;
        }
        .ea-armL { transform-origin: 32px 100px; } /* left shoulder */
        .ea-armR { transform-origin: 88px 100px; } /* right shoulder */
        .ea-legL { transform-origin: 52px 146px; } /* left hip */
        .ea-legR { transform-origin: 68px 146px; } /* right hip */
        .ea-torso { transform-origin: 60px 118px; } /* bob center */
        .ea-head  { transform-origin: 60px  60px; } /* subtle nod */
        /* Wrist pivot for palm wave (outward/inward) */
        .ea-hand  { transform-origin: 100px 129px; }

        /* ===== Talking animations (only while .ea-talking on SVG) ===== */
        .ea-talking .ea-armL { animation: ea-arm-swing 900ms ease-in-out infinite; }
        .ea-talking .ea-armR { animation: ea-arm-swing 900ms ease-in-out -450ms infinite; }
        .ea-talking .ea-legL { animation: ea-leg-swing 900ms ease-in-out infinite; }
        .ea-talking .ea-legR { animation: ea-leg-swing 900ms ease-in-out -450ms infinite; }
        .ea-talking .ea-torso { animation: ea-bob 900ms ease-in-out infinite; }
        .ea-talking .ea-head  { animation: ea-head-nod 900ms ease-in-out infinite; }

        /* One-time wrist wave (greeting) */
        .ea-wave { animation: ea-wrist 680ms ease-in-out 0s 4; }

        @keyframes ea-arm-swing {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(8deg); }
          50%  { transform: rotate(0deg); }
          75%  { transform: rotate(-8deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ea-leg-swing {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(-5deg); }
          50%  { transform: rotate(0deg); }
          75%  { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ea-bob {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-2.4px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ea-head-nod {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-0.8px) rotate(0.4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes ea-wrist {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(22deg); }   /* outward */
          50%  { transform: rotate(-14deg); }  /* inward */
          75%  { transform: rotate(18deg); }   /* outward */
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {/* Taller viewBox to fit longer legs and bigger torso */}
      <svg
        className={svgClass}
        width={size}
        height={height}
        viewBox="0 0 120 200"
        aria-hidden="true"
        style={{ display: "block", pointerEvents: "none" }}
      >
        {/* ===== HEAD ===== */}
        <g className="ea-head">
          <circle cx="60" cy="48" r="40" fill="#FFE1A8" stroke="#E3C869" />
          {/* eyes */}
          <circle cx="46" cy="44" r="4" fill="#333" />
          <circle cx="74" cy="44" r="4" fill="#333" />
          {/* mouth (lip-syncs with smoothing) */}
          <rect x={mouthX} y={66 - mouthHeight / 2} width={mouthWidth} height={mouthHeight} rx="7" fill="#B5443E" />
        </g>

        {/* ===== NECK (visible) ===== */}
        <g>
          <rect x="53" y="82" width="14" height="10" rx="3" fill="#F0C98D" stroke="#E1B97A" />
          {/* clavicle soft shadow */}
          <ellipse cx="60" cy="95" rx="10" ry="3" fill="rgba(0,0,0,0.06)" />
        </g>

        {/* ===== TORSO ===== */}
        <g className="ea-torso">
          {/* shirt with rounded shoulders */}
          <path
            d="M34 96 h52 a12 12 0 0 1 12 12 v18 a14 14 0 0 1 -14 14 H38 a14 14 0 0 1 -14 -14 v-18 a12 12 0 0 1 12 -12 z"
            fill="#6f98ff"
          />
          {/* chest highlight */}
          <path d="M44 100 h32 a10 10 0 0 1 10 10 v3 H36 v-3 a10 10 0 0 1 10 -10z" fill="rgba(255,255,255,.14)" />
          {/* belt */}
          <rect x="36" y="140" width="48" height="6" rx="3" fill="#232638" />
        </g>

        {/* ===== ARMS ===== */}
        {/* Left arm */}
        <g className="ea-armL">
          <rect x="26" y="104" width="12" height="24" rx="6" fill="#6f98ff" />
          <rect x="22" y="126" width="11" height="18" rx="6" fill="#F0C98D" />
          <ellipse cx="27" cy="146" rx="6.3" ry="5.8" fill="#F0C98D" />
        </g>

        {/* Right arm with wrist/palm group that can wave */}
        <g className="ea-armR">
          <rect x="82" y="104" width="12" height="24" rx="6" fill="#6f98ff" />
          <rect x="87" y="126" width="11" height="18" rx="6" fill="#F0C98D" />
          {/* wrist + palm (pivot set on .ea-hand) */}
          <g className={handClass}>
            <rect x="96" y="127" width="3" height="5" rx="1.5" fill="#F0C98D" />
            <ellipse cx="102" cy="132" rx="7.2" ry="6.2" fill="#F0C98D" />
            <rect x="97" y="137" width="10" height="3" rx="1.5" fill="#F0C98D" />
          </g>
        </g>

        {/* ===== PANTS & LEGS ===== */}
        <path d="M36 146 h48 v-8 a12 12 0 0 0 -12 -12 H48 a12 12 0 0 0 -12 12z" fill="#2b2f42" />
        {/* Left leg */}
        <g className="ea-legL">
          <rect x="48" y="146" width="8" height="34" rx="4" fill="#2b2f42" />
          <rect x="44" y="180" width="16" height="7" rx="3.5" fill="#5b3a2e" />
        </g>
        {/* Right leg */}
        <g className="ea-legR">
          <rect x="64" y="146" width="8" height="34" rx="4" fill="#2b2f42" />
          <rect x="60" y="180" width="16" height="7" rx="3.5" fill="#5b3a2e" />
        </g>
      </svg>
    </div>
  );
}
