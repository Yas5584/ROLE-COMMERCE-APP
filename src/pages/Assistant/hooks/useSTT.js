import { useEffect, useRef, useState } from "react";

/**
 * Simple Speech-to-Text hook using the Web Speech API (Chrome/Edge best).
 * Returns: { supported, listening, transcript, error, start, stop, takeFinal }
 */
export function useSTT({ lang = "en-US", interim = true } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  const RecognitionRef = useRef(null);
  const recRef = useRef(null);
  const finalRef = useRef("");

  useEffect(() => {
    const R =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    if (!R) {
      setSupported(false);
      return;
    }
    setSupported(true);
    RecognitionRef.current = R;

    const rec = new R();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = interim;

    rec.onresult = (e) => {
      let cur = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) {
          finalRef.current += res[0].transcript + " ";
        } else {
          cur += res[0].transcript;
        }
      }
      setTranscript((finalRef.current + cur).trim());
    };

    rec.onstart = () => {
      setListening(true);
      setError(null);
    };
    rec.onend = () => setListening(false);
    rec.onerror = (evt) => {
      setError(evt?.error || "speech-error");
      setListening(false);
    };

    recRef.current = rec;
    return () => {
      try { rec.stop(); } catch {}
    };
  }, [lang, interim]);

  const start = () => {
    if (!recRef.current) return;
    finalRef.current = "";
    setTranscript("");
    setError(null);
    try {
      recRef.current.start();
    } catch {
      /* start called twice can throw—ignore */
    }
  };

  const stop = () => {
    if (!recRef.current) return;
    try {
      recRef.current.stop();
    } catch {}
  };

  /**
   * Returns current transcript and clears internal buffers,
   * so next recording starts fresh.
   */
  const takeFinal = () => {
    const t = (transcript || "").trim();
    setTranscript("");
    finalRef.current = "";
    return t;
  };

  return { supported, listening, transcript, error, start, stop, takeFinal };
}
