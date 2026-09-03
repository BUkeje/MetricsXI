from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "MetricsXI server is running"}