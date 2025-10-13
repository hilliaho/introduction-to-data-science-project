import React, { useState, useEffect } from 'react'
import "./App.css"
import CardView from './components/CardView'
import CheckboxView from './components/CheckboxView'
import ResultView from './components/ResultView'
import logo from './assets/logo.png'
import frontPage from './assets/Etusivu.png'

const App = () => {
  const [step, setStep] = useState("start")
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedFields, setSelectedFields] = useState([])
  const [backendData, setBackendData] = useState(null)
  const [regions, setRegions] = useState({})
  const [hierarchy, setHierarchy] = useState({})
  const [loading, setLoading] = useState(false)

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
    const findApiNames = () => {
      const results = []
      const traverse = (node) => {
        if (selectedFields.includes(node.name.fi)) {
          if (node.name.data) {
            results.push(node.name.data)
          }
        }
        if (node.children) {
          Object.values(node.children).forEach(child => traverse(child))
        }
      }

      Object.values(hierarchy).forEach(rootNode => traverse(rootNode))

      return results
    }
    if (step === "results" && selectedRegions.length && selectedFields.length) {
      setLoading(true)
      console.log("selected fields:", selectedFields)
      let fields = findApiNames()
      fetch("http://localhost:8000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regions: selectedRegions,
          fields: fields,
        }),
      })
        .then((res) => res.json())
        .then((data) => setBackendData(data))
        .catch((err) => console.error("Virhe datan haussa:", err))
      setLoading(false)
    }
  }, [step, selectedFields, selectedRegions, hierarchy])

  const handleStart = () => {
    setStep("swipe")
  }

  if (!loading) {
    return (
      <div className='main'>
        {step !== "start" &&
          <div className='header-container'>
            <img className="logo" src={logo} />
          </div>}

        {step === "start" &&
          <div>
            <img className="front-page" src={frontPage} />
            <button className='start-button' onClick={handleStart}>Start</button>
            <span className='names'>By: Taina Hilliaho, Nelli Pintilä, Henry Vaga</span>
          </div>
        }

        {step === "swipe" &&
          <CardView regions={regions} selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} setStep={setStep} />}

        {step === "interests" &&
          <CheckboxView hierarchy={hierarchy} selectedFields={selectedFields} setSelectedFields={setSelectedFields} step={step} setStep={setStep} />}

        {step === "results" &&
          <ResultView backendData={backendData} selectedRegions={selectedRegions} selectedFields={selectedFields} />
        }

      </div>
    )
  }
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default App
