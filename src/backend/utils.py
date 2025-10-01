from pathlib import Path
import json


def create_city_list():
    data_path = "data.json"

    with open(data_path, "r", encoding="utf-8") as f:
        data = f.read()
        data = json.loads(data)

    regions = {}

    for doc in data:
        region = doc["maakuntaHakukohde"]
        city = doc["kuntaHakukohde"]
        if regions.get(region):
            if not city in regions.get(region):
                regions[region].append(city)
        else:
            regions[region] = [city]

    with open("regions.json", "w", encoding="utf-8") as f:
        json.dump(regions, f, ensure_ascii=False)


    for key, value in regions.items():
        print(f"{key}: {value}")

