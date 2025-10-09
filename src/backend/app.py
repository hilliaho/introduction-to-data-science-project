from fastapi import FastAPI, Request
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

@app.post("/api/results")
async def get_data(request: Request):
    body = await request.json()
    regions = body.get("regions", [])
    fields = body.get("fields", [])

    with open("data.json", "r") as f:
        data = json.load(f)

    filtered = [
        item for item in data
        if (not regions or item.get("maakuntaHakukohde") in regions)
        and (not fields or item.get("koulutusalaTaso3") in fields)
    ]

    return filtered

