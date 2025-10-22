# syntax=docker/dockerfile:1

# Käytetään kevyttä Python-imagen versiota
FROM python:3.11-slim

# Työhakemisto
WORKDIR /app

# Kopioidaan riippuvuudet
COPY requirements.txt .

# Asennetaan riippuvuudet
RUN pip install --no-cache-dir -r requirements.txt

# Kopioidaan sovelluksen lähdekoodi
COPY . .

# Sovellusportti (Fly odottaa 8080)
EXPOSE 8080

# Käynnistyskomento
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
