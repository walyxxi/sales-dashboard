import pytest
from fastapi.testclient import TestClient
from main import app

# Create a TestClient for making requests
client = TestClient(app)

# Mock response from Google Gemini
class MockGenAIResponse:
    text = "This is answer from AI"

class MockClient:
    def __init__(self, api_key):
        self.api_key = api_key

    class models:
        @staticmethod
        def generate_content(model, contents):
            return MockGenAIResponse()

# Patch client from google.genai
@pytest.fixture(autouse=True)
def patch_genai(monkeypatch):
    import routes.ai as ai_module
    monkeypatch.setattr(ai_module.genai, "Client", lambda api_key: MockClient(api_key))

# Test for successful AI response
def test_ai_response_success():
    response = client.post("/api/ai", json={"question": "What is AI?"})
    assert response.status_code == 200
    assert response.json()
    assert response.json()["response"] == "This is answer from AI"

# Test for handling empty question
def test_ai_response_empty_question():
    response = client.post("/api/ai", json={"question": "   "})
    assert response.status_code == 400
    assert response.json()["detail"] == "Question cannot be empty."

# Test for handling Google Gemini API errors
def test_ai_response_missing_key(monkeypatch):
    monkeypatch.setenv("GOOGLE_GEMINI_API_KEY", "")
    response = client.post("/api/ai/", json={"question": "Hello"})
    assert response.status_code == 500
    assert response.json()["detail"] == "Google Gemini API key is not configured."