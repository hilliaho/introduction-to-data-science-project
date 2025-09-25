import React, { useState, useEffect } from 'react'
import yes from './assets/yes.png'
import no from './assets/no.png'
import "./App.css"

function App() {
  const [step, setStep] = useState("city")
  const [userData, setUserData] = useState({})
  const [backendData, setBackendData] = useState(null)   // <- tähän backendin data
  const cityList = ["Tampere", "Turku", "Helsinki", "Oulu"]
  const [cityIndex, setCityIndex] = useState(0)

  useEffect(() => {
    fetch("http://localhost:8000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data)
        console.log("Haettu backendistä:", data)
      })
      .catch((err) => console.error("Virhe datan haussa:", err))
  }, [])

  const handleSwipe = (action) => {
    if (action === "like") {
      setUserData((prev) => ({
        ...prev,
        cities: [...(prev.cities || []), cityList[cityIndex]],
      }))
    }

    if (cityIndex === cityList.length - 1) {
      setStep("interests")
    } else {
      setCityIndex(cityIndex + 1)
    }
  }

  const handleStartAgain = () => {
    setStep("city")
    setCityIndex(0)
    setUserData({})
  }

  return (
    <div className='main'>
      <div className='header-container'>
        <h1>Stunder</h1>
      </div>

      {step === "city" &&
        <div className='city-card'>
          <h2>{cityList[cityIndex]}</h2>
          <img src={yes} onClick={() => handleSwipe("like")} alt="like" />
          <img src={no} onClick={() => handleSwipe("dislike")} alt="dislike" />
        </div>}

      {step === "interests" &&
        <div className='interests-list'>
          <h2>Kiinnostuksenkohteet</h2>
          <p>Kaupungit:</p>
          {userData.cities?.map((city) => <li key={city}>{city}</li>)}

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
