from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from supabase.client import create_client
import uuid
import tempfile
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_api_key = "OpenAi API Key"  # Replace with your OpenAI API key
supabase_url = "https://kjufzmihuxlneusawast.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdWZ6bWlodXhsbmV1c2F3YXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNjkyNTIsImV4cCI6MjA0Njc0NTI1Mn0.gDPPDrJS2_QXlx8kVBQda6PP1p2B2qYaPVkP6I0DEc8"

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
supabase_client = create_client(supabase_url, supabase_key)
user = supabase_client.auth.get_user()

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...), user_id: str = Form(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Generate a doc_id for the entire PDF
        doc_id = str(uuid.uuid4())
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
            
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        
        try:
            # Load and split PDF
            loader = PyPDFLoader(temp_path)
            pages = loader.load()
            docs = text_splitter.split_documents(pages)
            print(f"Processing {len(docs)} chunks")
            
            # Process each chunk
            for i, doc in enumerate(docs):
                try:
                    # Create embedding
                    embedding = embeddings.embed_query(doc.page_content)
                    
                    # Store in Supabase
                    document_data = {
                        'id': str(uuid.uuid4()),  # Unique ID for each chunk
                        'content': doc.page_content,
                        'embeddings': embedding,
                        'user_id': user_id,       # Using passed in user_id
                        'doc_id': doc_id          # Same for all chunks of one PDF
                    }
                    
                    supabase_client.table('content').insert(document_data).execute()
                    print(f"Processed chunk {i+1}/{len(docs)}")
                    
                except Exception as chunk_error:
                    print(f"Error in chunk {i+1}: {str(chunk_error)}")
                    raise HTTPException(status_code=500, detail=str(chunk_error))
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
        return {"status": "success", "message": "PDF processed successfully", "doc_id": doc_id}
        
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)