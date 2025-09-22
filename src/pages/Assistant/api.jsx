import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

// export const uploadPDF = (formData) => API.post("/upload", formData);
export const sendMessage  = (userText) => API.post("/chat", {userText});