from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError as GenAIClientError

load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["AI"])

# Request model
class AIRequest(BaseModel):
    question: str

# Response model
class AIResponse(BaseModel):
    response: str

@router.post("/", response_model=AIResponse)
async def get_ai_response(request: AIRequest):
    """
    AI endpoint that integrates with the Google Gemini API to generate responses.
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    # Securely fetch the Google Gemini API key from environment variables
    GOOGLE_GEMINI_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")
    if not GOOGLE_GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Google Gemini API key is not configured.")
    
    try:
        # Make a request to the Google Gemini API
        client = genai.Client(api_key=GOOGLE_GEMINI_API_KEY)

        genai_response = client.models.generate_content(
            model="gemini-2.0-flash", contents=request.question
        )
        return AIResponse(response=genai_response.text)
    except GenAIClientError as e:
        # Handle specific GenAIClientError from Google Gemini API
        raise HTTPException(status_code=400, detail=f"Google Gemini API error: {str(e)}")
    except requests.exceptions.RequestException as e:
        # Handle general request exceptions
        raise HTTPException(status_code=500, detail=f"Failed to fetch response from AI: {str(e)}")