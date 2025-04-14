from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes import sales, ai
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sales.router)
app.include_router(ai.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Sales Dashboard API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
