
import express from "express";
import fs from "fs";
const router = express.Router();
import { processPDF } from "../utils/initpdf.js";

const pdfMap = {
  "prod-pc": "./data/PC.pdf",
  "prod-mobile": "./data/Prod_mobile.pdf",
  "prod-projector": "./data/Prod-Projector.pdf"
};

router.post("/", async (req, res) => {
  const { id } = req.body;
  console.log(id)
//   console.log("this is my pdf id:", id);

  const pdfPath = pdfMap[id];
  console.log(pdfPath)
  if (!pdfPath) {
    return res.status(404).json({ error: "PDF not found" });
  }

  const buffer = fs.readFileSync(pdfPath);
  await processPDF(pdfPath)
 
});

export default router;









