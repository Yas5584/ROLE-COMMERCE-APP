import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.MODEL_API_KEY;
const BASE = process.env.MODEL_BASE_URL || 'https://api.openai.com/v1';
const MODEL = process.env.MODEL_NAME || 'gpt-4o-mini';

if (!API_KEY) {
  console.warn('[server] Missing MODEL_API_KEY in .env');
}

app.post('/chat', async (req, res) => {
  try {
    const { messages, system } = req.body || {};
    const payload = {
      model: MODEL,
      messages: [
        ...(system ? [{ role: 'system', content: system }] : []),
        ...(Array.isArray(messages) ? messages : [])
      ],
      temperature: 0.7
    };

    const r = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const msg = await r.text();
      return res.status(r.status).json({ error: msg });
    }

    const json = await r.json();
    const text = json?.choices?.[0]?.message?.content ?? '';
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'chat-failed' });
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`[server] up on http://localhost:${port}`);
});
