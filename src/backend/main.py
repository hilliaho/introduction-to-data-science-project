import requests, time, sys, json

def fetch_one_page_of_data_from_api(base_url, counter):
  retries = 0
  max_retries=3

  while retries < max_retries:
    url = base_url + str(counter)
    headers = {
      "Content-Type": "application/json",
    }

    try:
      response = requests.get(url, headers=headers).json()
      print(f"response length = {len(response)}")
      data = []
      for doc in response:
        simple_doc = {
          "hakukohde": doc["hakukohde"],
          "kuntaHakukohde": doc["kuntaHakukohde"]
        }
        data.append(simple_doc)
      return data
    except ValueError:
      retries+=1
      print(f"{retries} retries")
      time.sleep(1)
  if retries == max_retries:
    print(f"Download failed with offset {counter}")
    sys.exit(0)

def save_to_file(data):
  with open("data.json", "a") as f:
    json.dump(data, f)

def main():
  limit=1000
  dataset="korkeakoulutus_hakeneet_ja_paikan_vastaanottaneet"
  filter="koulutuksenAlkamisvuosi==2025"
  base_url = f"https://api.vipunen.fi/api/resources/{dataset}/data?filter={filter}&limit={str(limit)}&offset="
  max_rows_url = f"https://api.vipunen.fi/api/resources/{dataset}/data/count"

  headers = {
    "Content-Type": "application/json",
  }

  max_rows = requests.get(max_rows_url, headers=headers).json()
  print(f"max rows = {max_rows}")

  counter = 0

  while counter <= max_rows:
      data = fetch_one_page_of_data_from_api(base_url, counter)
      if len(data)==0:
        print("tulokset loppuivat")
        break
      save_to_file(data)
      counter = counter+limit
      print(counter)

if __name__=="__main__":
  main()
