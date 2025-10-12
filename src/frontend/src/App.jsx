import React, { useState, useEffect } from 'react'
import "./App.css"
import CardView from './components/CardView'
import CheckboxView from './components/CheckboxView'
import ResultView from './components/ResultView'

const App = () => {
  const [step, setStep] = useState("swipe")
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedFields, setSelectedFields] = useState([])
  const [backendData, setBackendData] = useState(null)
  const [regions, setRegions] = useState({})
  const [hierarchy, setHierarchy] = useState({})

  useEffect(() => {
    fetch("http://localhost:8000/api/regions")
      .then((res) => res.json())
      .then((data) => {
        setRegions(data["Fi"])
        console.log("regions:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
    fetch("http://localhost:8000/api/hierarchy")
      .then((res) => res.json())
      .then((data) => {
        setHierarchy(data)
        console.log("hierarchy:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
  }, [])



  useEffect(() => {
    if (step === "results" && selectedRegions.length && selectedFields.length) {
      console.log("selected fields:", selectedFields)
      fetch("http://localhost:8000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regions: selectedRegions,
          fields: selectedFields,
        }),
      })
        .then((res) => res.json())
        .then((data) => setBackendData(data))
        .catch((err) => console.error("Virhe datan haussa:", err))
    }
  }, [step, selectedFields, selectedRegions])


  const handleStartAgain = () => {
    setStep("city")
    setSelectedRegions([])
  }

  return (
    <div className='main'>
      <div className='header-container'>
        <h1>Stunder</h1>
      </div>

      {step === "swipe" &&
        <CardView regions={regions} selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} setStep={setStep} />}

      {step === "interests" &&
        <CheckboxView hierarchy={hierarchy} selectedFields={selectedFields} setSelectedFields={setSelectedFields} step={step} setStep={setStep} />}

      {step === "results" &&
        <ResultView backendData={backendData} selectedRegions={selectedRegions} selectedFields={selectedFields} />
      }

      {step === "data" &&
        <div className='interests-list'>
          <h2>Kiinnostuksenkohteet</h2>
          <p>Kaupungit:</p>
          {selectedRegions?.map((region) => <li key={region}>{region}</li>)}
          {hierarchy}
          <p>Backendistä haettu data:</p>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>

          <div className='start-again-button'>
            <button onClick={handleStartAgain}>Aloita alusta</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App
