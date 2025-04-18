from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from schemas.sales import SalesRepresentative
import json
import os

# Get the path to the dummy data file
dummy_data_path = os.path.join(os.path.dirname(__file__), "../dummyData.json")

router = APIRouter(prefix="/api/sales", tags=["Sales"])
@router.get("/", response_model=List[SalesRepresentative])
def get_sales_representatives(
    name: Optional[str] = Query(None, description="Filter by sales representative name"),
    status: Optional[str] = Query(None, description="Filter by deal status (e.g., 'In Progress', 'Closed Won')"),
    client_name: Optional[str] = Query(None, description="Filter by client name"),
    region: Optional[str] = Query(None, description="Filter by sales region"),
):
    """
    Fetch and filter sales representatives and their deals based on query parameters.
    """
    try:
        # Load sales dummy data from a JSON file
        with open(dummy_data_path, "r") as f:
            sales_data = json.load(f)["salesReps"]
        
        # Filter by sales representative name
        if name:
            sales_data = [rep for rep in sales_data if name.lower() in rep["name"].lower()]
        
        # Filter by deal status
        if status:
            for rep in sales_data:
                rep["deals"] = [deal for deal in rep["deals"] if status.lower() == deal["status"].lower()]
                sales_data = [rep for rep in sales_data if rep["deals"]]
        
        # Filter by client name
        if client_name:
            for rep in sales_data:
                rep["clients"] = [client for client in rep["clients"] if client_name.lower() in client["name"].lower()]
                sales_data = [rep for rep in sales_data if rep["clients"]]
        
        # Filter by sales region
        if region:
            sales_data = [rep for rep in sales_data if region.lower() in rep["region"].lower()]

        return sales_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load or filter sales data - {str(e)}")