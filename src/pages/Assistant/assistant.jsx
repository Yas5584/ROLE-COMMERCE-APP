
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
//import VideoRenderer from "./avatar/VideoRenderer.jsx";
import EmojiAvatar from "./avatar/Avatar.js";
import { useSTT } from "./hooks/useSTT.js";
import { useSharedSpeech } from "./hooks/useSharedSpeech.js";
import { sendMessage } from "./api.jsx";

// function topicFor(text="") {
//   const s = text.toLowerCase();
//   if (/(size|fit|small|large|measurement|dimension)/.test(s)) return "size";
//   if (/(deliver|shipping|arrive|courier|eta|date)/.test(s)) return "delivery";
//   if (/(add to cart|checkout|buy|basket|cart)/.test(s)) return "cart";
//   return "default";
// }

// function responseFor(topic) {
//   switch(topic) {
//     case "size":
//       return "This runs slightly small—consider one size up. Use our size guide if you're between measurements.";
//     case "delivery":
//       return "Estimated delivery: 2025-08-25 to 2025-08-27 via DemoCourier. You’ll receive tracking as soon as it ships.";
//     case "cart":
//       return "Done. The item has been added to your cart. You can review or checkout anytime.";
//     default:
//       return "I can help with size, delivery, or adding to cart. What would you like to know?";
//   }
// }

// function videoFor(topic) {
//   switch(topic) {
//     case "size": return "/avatar-size.mp4";
//     case "delivery": return "/avatar-delivery.mp4";
//     case "cart": return "/avatar-cart.mp4";
//     default: return "/avatar-default.mp4";
//   }
// }

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me about Product" }
  ]);
  const [input, setInput] = useState("");
  const [firstWave, setFirstWave] = useState(true);

  const stt = useSTT();
  const speech = useSharedSpeech();

  const lastAssistant = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].text;
    }
    return "";
  }, [messages]);

  useEffect(() => {
    if (lastAssistant) speech.speakText(lastAssistant);
  }, [lastAssistant]);

  // const curTopic = topicFor(lastAssistant || "");
  // const videoSrc = videoFor(curTopic);

  useEffect(() => {
    const t = setTimeout(() => setFirstWave(false), 2400);
    return () => clearTimeout(t);
  }, []);

  const send = async (maybeEventOrText) => {
   const userText =
     typeof maybeEventOrText === "string"
       ? maybeEventOrText.trim()
       : (input || "").trim();
    if (!userText) return;
    // const topic = topicFor(userText);
    // const assistant = responseFor(topic);
    // console.log(userText)
    const res=await sendMessage(userText)
    setMessages(m => [...m, { role: "user", text: userText }, { role: "assistant", text: res.data.answer } ]);
    setInput("");
  };

  const startRecord = () => stt.start();
  const stopRecord = () => {
    stt.stop();
    const final = stt.takeFinal();
    if (final) send(final);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🧠 Shop Assistant</h1>
        <div className="toolbar">
          <span className="tag">Mic: {stt.supported ? (stt.listening ? "listening…" : "ready") : "unsupported"}</span>
        </div>
      </div>

      <div className="grid">
        <div className="panel" style={{ display:"grid", gap:12, justifyItems:"center"}}>
          {/* <VideoRenderer
            src={videoSrc}
            externalOpen={speech.open}
            width={360}
            height={202}
            mouthBox={{ x: 168, y: 132, w: 40, h: 18 }}
            autoplay
            showOverlay={false}
          /> */}
          <div className="card" style={{ width:"100%", display:"grid", gap:8, placeItems:"center" }}>
            {/* <EmojiAvatar open={speech.open} wave={firstWave} size={120} />    */}
            <div className="tag">Emoji mirrors speech (lip‑sync + wave on first greet)</div>
          </div>
        </div>

        <div className="panel chat">
          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx} className="msg">
                <div className="bubble">
                  <b>{m.role === "assistant" ? "Assistant" : "You"}:</b> {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="inputRow">
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="Type a question about size, delivery, or cart…"
              onKeyDown={e => { if (e.key === "Enter") send(); }}
            />
            <button className="btn" onClick={() => send()}>Send</button>
            {!stt.listening && <button className="btn ghost" onClick={startRecord}>🎙️ Record</button>}
            {stt.listening && <button className="btn" onClick={stopRecord}>⏹ Stop</button>}
          </div>

          <div className="toolbar">
            <button className="ghost btn" onClick={() => setInput("What about size?")}>Ask Size</button>
            <button className="ghost btn" onClick={() => setInput("Can you deliver by Friday?")}>Ask Delivery</button>
            <button className="ghost btn" onClick={() => setInput("Add to cart")}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
