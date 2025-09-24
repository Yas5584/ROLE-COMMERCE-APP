import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { saveVectorStore } from "./VectorStore.js";





// Clean metadata for ChromaDB compatibility
function cleanMetadata(metadata) {
  const cleaned = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (value === null || value === undefined) {
      continue;
    }
    
    if (typeof value === 'string' || 
        typeof value === 'number' || 
        typeof value === 'boolean') {
      cleaned[key] = value;
    } else {
      // Convert complex objects to JSON strings
      cleaned[key] = JSON.stringify(value);
    }
  }
  
  return cleaned;
}




export async function processPDF(path) {
  try {
   
  console.log("Loading  PDF:", path);

    
    const loader = new PDFLoader(path);
    const docs = await loader.load();
    console.log(`Loaded ${docs.length} documents`);

    const splitter = new RecursiveCharacterTextSplitter({ 
      chunkSize: 1000,
      chunkOverlap: 200 
    });
    
    const chunks = await splitter.splitDocuments(docs);
    console.log(`Split into ${chunks.length} chunks`);

    // Clean metadata for ChromaDB
    const cleanedChunks = chunks.map(chunk => ({
      pageContent: chunk.pageContent,
      metadata: {
        ...cleanMetadata(chunk.metadata),
        // Essential fields we know are safe
        source: String(chunk.metadata.source || filePath),
        page: Number(chunk.metadata.pdf?.pageNumber || 0)
      }
    }));

    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: "",
      model: "sentence-transformers/all-MiniLM-L6-v2"
    });


    await saveVectorStore(cleanedChunks, embeddings);
    console.log("PDF processed successfully!");
  
    
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
}


