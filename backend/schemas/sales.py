from pydantic import BaseModel
from typing import List

class Deal(BaseModel):
    client: str
    value: int
    status: str

class Client(BaseModel):
    name: str
    industry: str
    contact: str

class SalesRepresentative(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]

# Example usage in the API response model:
# response_model=List[SalesRepresentative]