import pytest
import json
from fastapi.testclient import TestClient
from main import app

# Create a TestClient for making requests
client = TestClient(app)

@pytest.fixture
def load_dummy_data():
    """
    Load dummy data for testing from the JSON file.
    """
    dummy_data_path = "dummyData.json"
    with open(dummy_data_path, "r") as file:
        return json.load(file)


def test_get_sales(load_dummy_data):
    """
    Test the /api/sales GET endpoint to ensure it returns the dummy data.
    """
    response = client.get("/api/sales")
    print(load_dummy_data)
    assert response.status_code == 200
    assert response.json() == load_dummy_data["salesReps"]


def test_sales_data_structure():
    """
    Test the structure of the response from the /api/sales/ endpoint.
    """
    response = client.get("/api/sales")
    assert response.status_code == 200
    sales_data = response.json()

    # Check that the response is a list
    assert isinstance(sales_data, list)

    # Check the structure of the first item
    first_rep = sales_data[0]
    assert "id" in first_rep
    assert "name" in first_rep
    assert "region" in first_rep
    assert "skills" in first_rep
    assert isinstance(first_rep["skills"], list)
    assert "deals" in first_rep
    assert isinstance(first_rep["deals"], list)
    assert "clients" in first_rep
    assert isinstance(first_rep["clients"], list)


def test_sales_empty_data():
    """
    Simulate empty data and check the response from /api/sales/.
    """
    # Temporarily replace dummyData.json with an empty list
    original_data_path = "dummyData.json"
    with open(original_data_path, "r") as file:
        original_data = file.read()

    try:
        with open(original_data_path, "w") as file:
            file.write('{"salesReps":[]}')  # Write an empty list to the file

        response = client.get("/api/sales")
        print(response.json())
        assert response.status_code == 200
        assert response.json() == []
    finally:
        # Restore the original data
        with open(original_data_path, "w") as file:
            file.write(original_data)