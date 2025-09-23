import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoute from "./routes/chat.js";
import { processPDF } from "./utils/initpdf.js";
import pdfRoute from "./routes/pdf.js"
// import pdfRoute from "./utils/initpdf.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// if (app.use("/api/upload", uploadRoute))
app.use("/api/pdf",pdfRoute);
// await processPDF();

app.use("/api/chat", chatRoute);


const PORT = 3001;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));
