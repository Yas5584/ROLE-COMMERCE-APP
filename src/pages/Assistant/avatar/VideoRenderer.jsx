
import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useAudioMouth } from "../hooks/useAudioMouth.js";

/**
 * Video renderer with mouth overlay.
 * Drive lips either by:
 *  - externalOpen (boolean) from a shared speech hook, OR
 *  - audio element (ttsUrl) analyzed by WebAudio.
 */
function VideoRenderer({
  src,
  ttsUrl,
  externalOpen,
  autoplay = true,
  width = 480,
  height = 270,
  mouthBox = { x: 200, y: 150, w: 80, h: 30 },
  showOverlay = false,
}) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const { open: audioOpen } = useAudioMouth(ttsUrl ? (audioRef.current || null) : null);
  const open = typeof externalOpen === "boolean" ? externalOpen : audioOpen;

  const mouthHeight = useMemo(() => (open ? mouthBox.h : Math.max(6, mouthBox.h * 0.22)), [open, mouthBox.h]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (autoplay) videoRef.current.play().catch(() => {});
    }
    if (ttsUrl && audioRef.current && autoplay) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [src, ttsUrl, autoplay]);

  return (
    <div style={{ position: "relative", width, height }}>
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        playsInline
        autoPlay={autoplay}
        loop
        muted
        style={{ display: "block", borderRadius: 12 }}
      />
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <rect
          x={mouthBox.x}
          y={mouthBox.y + (mouthBox.h / 2) - (mouthHeight / 2)}
          width={mouthBox.w}
          height={mouthHeight}
          rx={Math.min(12, mouthBox.h / 2)}
          fill="#B5443E"
          opacity="0.92"
        />
        {mouthHeight > mouthBox.h * 0.55 && (
          <rect
            x={mouthBox.x + 4}
            y={mouthBox.y + (mouthBox.h / 2) - 6}
            width={mouthBox.w - 8}
            height={12}
            rx={6}
            fill="#FFFFFF"
            opacity="0.95"
          />
        )}
      </svg>
      {ttsUrl ? <audio ref={audioRef} src={ttsUrl} preload="auto" /> : null}
    </div>
  );
}

VideoRenderer.propTypes = {
  src: PropTypes.string.isRequired,
  ttsUrl: PropTypes.string,
  externalOpen: PropTypes.bool,
  autoplay: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  mouthBox: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
  }),
  showOverlay: PropTypes.bool,
};

export default VideoRenderer;
