import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from './supabase';

// Function to convert File to ArrayBuffer
const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const embedPdf = async (
  file: File,
  openAIKey: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Convert File to ArrayBuffer
    const buffer = await fileToArrayBuffer(file);

    // Create PDF loader
    const loader = new PDFLoader(new Blob([buffer]));
    const docs = await loader.load();

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);

    // Create embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openAIKey,
    });

    // Store in Supabase
    await SupabaseVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        client: supabase,
        tableName: 'documents',
        queryName: 'match_documents',
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error embedding PDF:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
export const insertNewEmbeddings = async () => {
  const { data, error } = await supabase.from("embeddings").insert([
    {
      id: 1,
      created_at: new Date(),
      embedding: "test",
    },
    ])
    .select("*")
    .single();

  return { data, error };
};