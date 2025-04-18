# Sales Dashboard

A full-stack project for managing and displaying sales data, built using **FastAPI** for the backend and **Next.js** for the frontend. The project leverages **Tailwind CSS** for styling and includes unit tests for both the backend and frontend.

---

## Features

- **Backend**: FastAPI with routes for fetching and filtering sales data.
- **Frontend**: Next.js for a dynamic and responsive UI.
- **Styling**: Tailwind CSS for modern, utility-first styling.
- **Testing**: Backend tests using pytest.

---

## Key Components of the Project Structure

### 1. **Backend**:
   - **`main.py`**: Entry point for the FastAPI backend.
   - **`routes/sales.py`**: Handles the `/sales` API endpoint with filtering functionality.
   - **`routes/ai.py`**: Handles the `/ai` API endpoint.
   - **`schemas`**: Defines Pydantic models for request/response validation.
   - **`dummyData.json`**: Contains the nested JSON structure for sales data.
   - **`tests/test_sales.py`**: Unit tests for `/sales` API functionality using `pytest`.
   - **`tests/test_ai.py`**: Unit tests for `/ai` API functionality using `pytest`.

### 2. **Frontend**:
   - **`components/Layout`**: A route layout component.
   - **`components/ui`**: A reusable UI component.
   - **`pages/index.js`**: The main dashboard page displaying sales representatives and their deals.
   - **`pages/chat.js`**: The AI Chat page.
   - **`styles/globals.css`**: Includes Tailwind CSS directives.
   - **`tailwind.config.js`**: Configures Tailwind CSS for the project.

### 3. **Testing**:
   - Backend tests use `pytest` for robust API testing.

### 4. **Styling**:
   - Tailwind CSS is fully integrated for modern, utility-first styling.

---

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- Python (>= 3.10)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sales-dashboard.git
   cd sales-dashboard
   ```

2. **Backend Setup**

   Before setup for backend, please find google API key for gemini AI integration.
   Visit [Google AI Studio](https://aistudio.google.com/apikey) to get your API key.
   Copy the API key and paste into `.env` file.
   ```bash
   cd backend
   cp .env.example .env  # make .env file by copy .env.example
   python -m venv .venv
   source .venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Visit the application at `http://localhost:3000`.

---

## Running Tests

### Backend Tests
Run unit tests for the backend using `pytest`:
```bash
cd backend
pytest tests
```

---

## License

This project is licensed under the MIT License.