from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

class Query(BaseModel):
    verse: str
    question: str

# Load a pre-trained NLP model (e.g., GPT-2)
nlp_model = pipeline("text2text-generation", model="t5-base")

@app.get("/")
def read_root():
    return {"message": "AI-Powered Scripture Interpreter"}

@app.post("/interpret")
def interpret_verse(query: Query):
    # Generate interpretation using the NLP model
    input_text = f"Verse: {query.verse} Question: {query.question}"
    result = nlp_model(input_text, max_length=50)
    interpretation = result[0]['generated_text']
    return {"interpretation": interpretation}
