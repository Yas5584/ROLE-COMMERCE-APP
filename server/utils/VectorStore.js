import { Chroma } from "@langchain/community/vectorstores/chroma";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

let vectorStore = null;

export async function saveVectorStore(docs, embeddings) {
  try {
    vectorStore = await Chroma.fromDocuments(docs, embeddings, {
      url: "http://localhost:8000", 
      collectionName: "pdf-chat",
      host:"0.0.0.0"
    });
    console.log("Vector store saved with", docs.length, "documents");
    return vectorStore;
  } catch (error) {
    console.error("Error saving vector store:", error);
    throw error;
  }
}

export async function getVectorStore() {
  if (!vectorStore) {
    throw new Error("No PDF processed yet. Please upload a PDF document first.");
  }
  return vectorStore;
}

// Optional: Check if collection exists
export async function checkCollectionExists() {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: "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",
      model: "sentence-transformers/all-MiniLM-L6-v2"
    });
    
    const store = await Chroma.fromExistingCollection(embeddings, {
      url: "http://localhost:8000",
      collectionName: "pdf-chat",
    });
    
    return true;
  } catch (error) {
    return false;
  }
}