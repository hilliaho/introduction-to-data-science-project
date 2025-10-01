import React, { useState, useEffect } from 'react'
import "./App.css"
import CardView from './components/CardView'

const App = () => {
  const [step, setStep] = useState("swipe")
  const [selectedRegions, setSelectedRegions] = useState([])
  const [backendData, setBackendData] = useState(null)
  const [regions, setRegions] = useState({})
  const [hierarchy, setHierarchy] = useState({})

  useEffect(() => {
    fetch("http://localhost:8000/api/regions")
      .then((res) => res.json())
      .then((data) => {
        setRegions(Object.keys(data))
        console.log("Haettu backendistä:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
    fetch("http://localhost:8000/api/hierarchy")
      .then((res) => res.json())
      .then((data) => {
        setHierarchy(data)
        console.log("Haettu backendistä:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
    fetch("http://localhost:8000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data)
        console.log("Haettu backendistä:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
  }, [])



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
