import { useEffect, useRef, useState } from "react";

export function useAudioMouth(audioEl) {
  const raf = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!audioEl) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const src = ctx.createMediaElementSource(audioEl);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    const data = new Uint8Array(analyser.frequencyBinCount);
    src.connect(analyser);
    analyser.connect(ctx.destination);

    const loop = () => {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 3; i < Math.min(30, data.length); i++) sum += data[i]; // ~speech band
      const avg = sum / 27;
      setOpen(prev => (prev ? avg > 18 : avg > 22)); // hysteresis
      raf.current = requestAnimationFrame(loop);
    };

    const onPlay = () => {
      if (ctx.state === "suspended") ctx.resume();
      if (!raf.current) loop();
    };
    const onStop = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      setOpen(false);
    };

    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("ended", onStop);
    audioEl.addEventListener("pause", onStop);

    return () => {
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("ended", onStop);
      audioEl.removeEventListener("pause", onStop);
      if (raf.current) cancelAnimationFrame(raf.current);
      try { ctx.close(); } catch {}
    };
  }, [audioEl]);

  return { open };
}
