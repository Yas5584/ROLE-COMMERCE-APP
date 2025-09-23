
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChromaClient } from "chromadb";

let vectorStore = null;
const COLLECTION_NAME = "pdf-chat";
const CHROMA_URL = "http://localhost:8000";

export async function saveVectorStore(docs, embeddings) {
  try {
    const client = new ChromaClient({ path: CHROMA_URL });

    // Always delete old collection first (to avoid mixing vectors)
    try {
      await client.deleteCollection({ name: COLLECTION_NAME });
      console.log(`Deleted old collection: ${COLLECTION_NAME}`);
    } catch (err) {
      console.log("No previous collection found, creating fresh...");
    }

    // Now create a fresh collection
    vectorStore = await Chroma.fromDocuments(docs, embeddings, {
      url: CHROMA_URL,
      collectionName: COLLECTION_NAME,
    });

    console.log(" Vector store saved with", docs.length, "documents");
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

// Utility to check if collection exists
export async function checkCollectionExists() {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: "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",
      model: "sentence-transformers/all-MiniLM-L6-v2",
    });

    const store = await Chroma.fromExistingCollection(embeddings, {
      url: CHROMA_URL,
      collectionName: COLLECTION_NAME,
    });

    return !!store;
  } catch (error) {
    return false;
  }
}
