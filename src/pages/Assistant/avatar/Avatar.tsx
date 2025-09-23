
import React, { useEffect, useRef, useState } from "react";

export default function EmojiAvatar({ open = false, wave = false, size = 160 }) {
  const [talking, setTalking] = useState(false);
  const offTimer = useRef(null);

  // Smooth talking on/off
  useEffect(() => {
    if (open) {
      if (offTimer.current) clearTimeout(offTimer.current);
      setTalking(true);
    } else {
      if (offTimer.current) clearTimeout(offTimer.current);
      offTimer.current = setTimeout(() => setTalking(false), 220);
    }
  }, [open]);

  const height = Math.round(size * 1.9);
  const svgClass = talking ? "ea-svg ea-talking" : "ea-svg";
  const handClass = wave ? "ea-hand ea-wave" : "ea-hand";

  return (
    <div style={{ display: "grid", placeItems: "center", width: size, height }}>
      <style>{`
        .ea-armL, .ea-armR, .ea-legL, .ea-legR, .ea-torso, .ea-hand, .ea-head {
          transform-box: fill-box;
        }
        .ea-armL { transform-origin: 32px 100px; }
        .ea-armR { transform-origin: 88px 100px; }
        .ea-legL { transform-origin: 52px 146px; }
        .ea-legR { transform-origin: 68px 146px; }
        .ea-torso { transform-origin: 60px 118px; }
        .ea-head  { transform-origin: 60px  60px; }
        .ea-hand  { transform-origin: 100px 129px; }

        /* Talking body movement */
        .ea-talking .ea-armL { animation: ea-arm-swing 900ms ease-in-out infinite; }
        .ea-talking .ea-armR { animation: ea-arm-swing 900ms ease-in-out -450ms infinite; }
        .ea-talking .ea-legL { animation: ea-leg-swing 900ms ease-in-out infinite; }
        .ea-talking .ea-legR { animation: ea-leg-swing 900ms ease-in-out -450ms infinite; }
        .ea-talking .ea-torso { animation: ea-bob 900ms ease-in-out infinite; }
        .ea-talking .ea-head  { animation: ea-head-nod 900ms ease-in-out infinite; }

        /* Lip sync via scaleY instead of re-render */
        .ea-mouth {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.15s ease-out;
        }
        .ea-mouth.open {
          transform: scaleY(1.6);
        }

        /* One-time wrist wave */
        .ea-wave { animation: ea-wrist 680ms ease-in-out 0s 4; }

        @keyframes ea-arm-swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-8deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ea-leg-swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ea-bob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-2.4px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ea-head-nod {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-0.8px) rotate(0.4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes ea-wrist {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(22deg); }
          50% { transform: rotate(-14deg); }
          75% { transform: rotate(18deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      <svg
        className={svgClass}
        width={size}
        height={height}
        viewBox="0 0 120 200"
        aria-hidden="true"
        style={{ display: "block", pointerEvents: "none" }}
      >
        {/* HEAD */}
        <g className="ea-head">
          <circle cx="60" cy="48" r="40" fill="#FFE1A8" stroke="#E3C869" />
          <circle cx="46" cy="44" r="4" fill="#333" />
          <circle cx="74" cy="44" r="4" fill="#333" />
          {/* Mouth */}
          <rect
            className={`ea-mouth ${open ? "open" : ""}`}
            x="42"
            y="60"
            width="36"
            height="10"
            rx="7"
            fill="#B5443E"
          />
        </g>

        {/* NECK */}
        <g>
          <rect x="53" y="82" width="14" height="10" rx="3" fill="#F0C98D" stroke="#E1B97A" />
          <ellipse cx="60" cy="95" rx="10" ry="3" fill="rgba(0,0,0,0.06)" />
        </g>

        {/* TORSO */}
        <g className="ea-torso">
          <path
            d="M34 96 h52 a12 12 0 0 1 12 12 v18 a14 14 0 0 1 -14 14 H38 a14 14 0 0 1 -14 -14 v-18 a12 12 0 0 1 12 -12 z"
            fill="#6f98ff"
          />
          <path d="M44 100 h32 a10 10 0 0 1 10 10 v3 H36 v-3 a10 10 0 0 1 10 -10z" fill="rgba(255,255,255,.14)" />
          <rect x="36" y="140" width="48" height="6" rx="3" fill="#232638" />
        </g>

        {/* LEFT ARM */}
        <g className="ea-armL">
          <rect x="26" y="104" width="12" height="24" rx="6" fill="#6f98ff" />
          <rect x="22" y="126" width="11" height="18" rx="6" fill="#F0C98D" />
          <ellipse cx="27" cy="146" rx="6.3" ry="5.8" fill="#F0C98D" />
        </g>

        {/* RIGHT ARM */}
        <g className="ea-armR">
          <rect x="82" y="104" width="12" height="24" rx="6" fill="#6f98ff" />
          <rect x="87" y="126" width="11" height="18" rx="6" fill="#F0C98D" />
          <g className={handClass}>
            <rect x="96" y="127" width="3" height="5" rx="1.5" fill="#F0C98D" />
            <ellipse cx="102" cy="132" rx="7.2" ry="6.2" fill="#F0C98D" />
            <rect x="97" y="137" width="10" height="3" rx="1.5" fill="#F0C98D" />
          </g>
        </g>

        {/* PANTS & LEGS */}
        <path d="M36 146 h48 v-8 a12 12 0 0 0 -12 -12 H48 a12 12 0 0 0 -12 12z" fill="#2b2f42" />
        <g className="ea-legL">
          <rect x="48" y="146" width="8" height="34" rx="4" fill="#2b2f42" />
          <rect x="44" y="180" width="16" height="7" rx="3.5" fill="#5b3a2e" />
        </g>
        <g className="ea-legR">
          <rect x="64" y="146" width="8" height="34" rx="4" fill="#2b2f42" />
          <rect x="60" y="180" width="16" height="7" rx="3.5" fill="#5b3a2e" />
        </g>
      </svg>
    </div>
  );
}




