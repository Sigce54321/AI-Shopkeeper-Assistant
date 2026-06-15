from fastapi import FastAPI

app = FastAPI(title="AI Shopkeeper Assistant")

@app.get("/")
def home():
    return {"message": "AI Shopkeeper Assistant Backend Running"}