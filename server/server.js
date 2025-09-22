import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoute from "./routes/chat.js";
import { processPDF } from "./utils/initpdf.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/upload", uploadRoute);
    await processPDF();

app.use("/api/chat", chatRoute);

const PORT = 3001;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));
