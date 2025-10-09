import requests, time, sys, json
from utils import create_city_list


def fetch_one_page_of_data_from_api(base_url, counter, data):
    retries = 0
    max_retries = 3

    while retries < max_retries:
        url = base_url + str(counter)
        headers = {
            "Content-Type": "application/json",
        }

        try:
            response = requests.get(url, headers=headers).json()
            print(f"response length = {len(response)}")
            if len(response) == 0:
                return False
            for doc in response:
                if doc["tutkinnonAloitussykli"] != "I sykli":
                    continue
                if doc["hakutapa"] != "Yhteishaku":
                    continue
                if doc["koulutuksenAlkamiskausi"] == "Syksy":
                    if not doc["valitutLkm"]:
                        doc["valitutLkm"] = 0
                    if not doc["kaikkiHakijatLkm"]:
                        doc["kaikkiHakijatLkm"] = 0
                    out = False
                    for degree in data:
                        if doc["hakukohde"] == degree["hakukohde"]:
                            degree["valitutLkm"] += doc["valitutLkm"]
                            degree["kaikkiHakijatLkm"] += doc["kaikkiHakijatLkm"]
                            if degree["kaikkiHakijatLkm"] == 0:
                                degree["prosentti"] = 0
                                out = True
                                continue
                            degree["prosentti"] = (
                                degree["valitutLkm"] / degree["kaikkiHakijatLkm"]
                            )
                            out = True
                            continue
                    if out:
                        out = False
                        continue
                    if doc["kaikkiHakijatLkm"] == 0:
                        continue
                    simple_doc = {
                        "hakukohde": doc["hakukohde"],
                        "korkeakoulu": doc["korkeakoulu"],
                        "hakutapa": doc["hakutapa"],
                        "kuntaHakukohde": doc["kuntaHakukohde"],
                        "maakuntaHakukohde": doc["maakuntaHakukohde"],
                        "tutkinnonAloitussykli": doc["tutkinnonAloitussykli"],
                        "koulutuksenAlkamiskausi": doc["koulutuksenAlkamiskausi"],
                        "koulutusalaTaso1": doc["koulutusalaTaso1"],
                        "koulutusalaTaso2": doc["koulutusalaTaso2"],
                        "koulutusalaTaso3": doc["koulutusalaTaso3"],
                        "koulutuksenKieli": doc["koulutuksenKieli"],
                        "valitutLkm": doc["valitutLkm"],
                        "kaikkiHakijatLkm": doc["kaikkiHakijatLkm"],
                        "prosentti": doc["valitutLkm"] / doc["kaikkiHakijatLkm"],
                    }
                    data.append(simple_doc)
            return data
        except ValueError:
            retries += 1
            print(f"{retries} retries")
            time.sleep(1)
    if retries == max_retries:
        print(f"Download failed with offset {counter}")
        sys.exit(0)


def save_to_file(data):
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)


def sort():
    with open("data.json", "r") as f:
        data = f.read()
    data = json.loads(data)
    sorted_data = sorted(data, key=lambda x: x["prosentti"], reverse=True)
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(sorted_data, f, ensure_ascii=False)


def main():
    limit = 1000
    dataset = "korkeakoulutus_hakeneet_ja_paikan_vastaanottaneet"
    filter = "koulutuksenAlkamisvuosi==2025"
    base_url = f"https://api.vipunen.fi/api/resources/{dataset}/data?filter={filter}&limit={str(limit)}&offset="
    max_rows_url = f"https://api.vipunen.fi/api/resources/{dataset}/data/count"

    headers = {
        "Content-Type": "application/json",
    }

    max_rows = requests.get(max_rows_url, headers=headers).json()
    print(f"max rows = {max_rows}")

    counter = 0
    data = []
    while counter <= max_rows:
        if not fetch_one_page_of_data_from_api(base_url, counter, data):
            break
        counter += limit
        save_to_file(data)
    sort()
    hierarchy = {}
    for doc in data:
        taso1 = doc.get("koulutusalaTaso1")
        taso2 = doc.get("koulutusalaTaso2")
        taso3 = doc.get("koulutusalaTaso3")
        if taso1 not in hierarchy and taso1 != "Tieto puuttuu":
            hierarchy[taso1] = {}
        if taso2 != "Tieto puuttuu" and taso2 not in hierarchy[taso1]:
            hierarchy[taso1][taso2] = set()
        if taso3 != "Tieto puuttuu":
            hierarchy[taso1][taso2].add(taso3)
    for taso1, subcats in hierarchy.items():
        for taso2 in subcats:
            hierarchy[taso1][taso2] = sorted(list(hierarchy[taso1][taso2]))
    with open("hierarchy.json", "w", encoding="utf-8") as f:
        json.dump(hierarchy, f, ensure_ascii=False, indent=2)
    create_city_list()


if __name__ == "__main__":
    main()
