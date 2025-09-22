
import { useEffect, useRef, useState } from "react";

/** Centralized speech for the app; returns { open, speakText } */
export function useSharedSpeech({ rate=1, pitch=1, volume=1, voiceName } = {}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const speakText = (text) => {
    if (!text) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate; utter.pitch = pitch; utter.volume = volume;
    if (voiceName) {
      const v = window.speechSynthesis.getVoices().find(x => x.name === voiceName);
      if (v) utter.voice = v;
    }
    utter.onstart = () => setOpen(true);
    utter.onend = () => { setOpen(false); if (timerRef.current) clearTimeout(timerRef.current); };
    utter.onboundary = (e) => {
      setOpen(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      const dur = e.charLength && e.charLength > 4 ? 150 : 110;
      timerRef.current = setTimeout(() => setOpen(false), dur);
    };
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  return { open, speakText };
}
