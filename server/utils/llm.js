


import { ChatGroq } from "@langchain/groq";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { getVectorStore } from "./VectorStore.js";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { processPDF } from "./initpdf.js";
import {
  StateGraph,
  START,
  END,
  MemorySaver,
  messagesStateReducer,
  Annotation,
   MessagesAnnotation,
} from "@langchain/langgraph";


export async function askQuestion(query) {
  try {

    const vectorStore = await getVectorStore();
    
    const llm = new ChatGroq({
      apiKey: "your Groq API Key",
      model: "llama-3.3-70b-versatile",
    });

    
    const retriever = vectorStore.asRetriever();
    

    // Create a proper retriever function
    const retrieveContext = async (question) => {
      const docs = await vectorStore.similaritySearch(question, 5);
      return docs.map(doc => doc.pageContent).join("\n\n");
    };
    // History chain
const contextualizeQSystemPrompt =
  "Given a chat history and the latest user question " +
  "which might reference context in the chat history, " +
  "formulate a standalone question which can be understood " +
  "without the chat history. Do NOT answer the question, " +
  "just reformulate it if needed and otherwise return it as is.";

const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
  ["system", contextualizeQSystemPrompt],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);


const historyAwareRetriever = await createHistoryAwareRetriever({
  llm,
  retriever,
  rephrasePrompt: contextualizeQPrompt,
});

const systemPrompt =
  "You are an assistant for question-answering tasks. " +
  "Use the following pieces of retrieved context to answer" +
  "the question. If you don't know the answer, say that you " +
  "don't know. Use three sentences maximum and keep the " +
  "answer concise." +
  "\n\n" +
  "{context}";

const qaPrompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const questionAnswerChain = await createStuffDocumentsChain({
  llm,
  prompt: qaPrompt,
});

const ragChain = await createRetrievalChain({
  retriever: historyAwareRetriever,
  combineDocsChain: questionAnswerChain,
});
   
// Define the State interface
const GraphAnnotation = Annotation.Root({
  input: Annotation(),
  chat_history: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  context: Annotation(),
  answer: Annotation(),
});

// Define the call_model function
async function callModel(state) {
  const response = await ragChain.invoke(state);
  return {
    chat_history: [
      new HumanMessage(state.input),
      new AIMessage(response.answer),
    ],
    context: response.context,
    answer: response.answer,
  };
}

// Create the workflow
const workflow = new StateGraph(GraphAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Compile the graph with a checkpointer object
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
const config = { configurable: { thread_id: "abc" } };

const result = await app.invoke(
  { input: query },
  config
);




    
        // for await (const { content } of stream) {
        //   console.log(content);
        // }



// const chatHistory = (await app.getState(config)).values.chat_history;
// for (const message of chatHistory) {
//   console.log(message);
// }
// console.log(result.answer)
return result.answer



    // const response = await ragChain.invoke({ question: query });
    // return response;
    
  } catch (error) {
    console.error("Error in askQuestion:", error);
    throw new Error(`Failed to generate answer: ${error.message}`);
  }
}