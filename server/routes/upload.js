// import express from "express";
// import { processPDF } from "../utils/initpdf.js";

// const router = express.Router();

// // Path to your fixed PDF file (already in your backend project)
// // const FIXED_PDF_PATH = ".Uploaded_pdf/Microsoft_TTS_Voices.pdf";

// // Store processed PDF content globally (memory cache)
// let pdfData = null;

// // Process PDF once at startup
// (async () => {
//   try {
//     pdfData = await processPDF();
//     console.log("PDF processed successfully at startup");
//   } catch (err) {
//     console.error("Error processing PDF at startup:", err);
//   }
// })();