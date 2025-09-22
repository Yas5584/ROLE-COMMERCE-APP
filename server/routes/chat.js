import express from "express";
import { askQuestion } from "../utils/llm.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userText } = req.body;
    // console.log("hello from backend Chat",userText)
    const answer = await askQuestion(userText);
    res.json({ answer });
  } catch (err) {
    console.error("❌ Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
