from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
def get_data():
    with open("data.json", "r") as f:
        data = json.load(f)
    return data

@app.get("/api/hierarchy")
def get_hierarchy():
    print("get hierarchy")
    with open("hierarchy.json", "r") as f:
        data = json.load(f)
    return data

@app.get("/api/regions")
def get_regions():
    with open("regions.json", "r") as f:
        data = json.load(f)
    return data

