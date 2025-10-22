# introduction-to-data-science-project

https://frontend-icy-dawn-6025.fly.dev/

## Running locally

### Clone the repository:
```bash
git clone git@github.com:hilliaho/introduction-to-data-science-project.git
```

### Run the backend
```bash
cd src/backend
poetry install
poetry run uvicorn app:app --host 0.0.0.0 --port 8080
```

### Run the frontend
In another terminal:
```bash
cd src/frontend
npm install
npm start
```
The frontend should be available at http://localhost:3000
