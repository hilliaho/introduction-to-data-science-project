import React, { useState, useEffect } from 'react'

import yes from '../assets/yes.png'
import no from '../assets/no.png'
import Keskisuomi from '../assets/Keski-Suomi.png'
import Häme from '../assets/Häme.png'
import Kainuu from '../assets/Kainuu.png'
import Karjala from '../assets/Karjala.png'
import Lappi from '../assets/Lappi.png'
import Pirkanmaa from '../assets/Pirkanmaa.png'
import Pohjanmaa from '../assets/Pohjanmaa.png'
import Satakunta from '../assets/Satakunta.png'
import Savo from '../assets/Savo.png'
import Uusimaa from '../assets/Uusimaa.png'
import Varsinaissuomi from '../assets/Varsinais-Suomi.png'



const Card = ({ regions, selectedRegions, setSelectedRegions, setStep }) => {
  console.log("selected regions: ", selectedRegions)
  const regionNames = Object.keys(regions)
  const [i, setIndex] = useState(0)


  useEffect(() => {
    if (i === regionNames.length - 1) {
      setStep("interests")
    }
  }, [i])


  const handleSwipe = (action) => {
    console.log("regionNames[i]:", regionNames[i])
    if (action === "like") {
      let new_regions = regions[regionNames[i]]
      console.log("new regions:", new_regions)
      new_regions.forEach(region => setSelectedRegions(prev => [...prev, region]))
    }

    if (i === regions.length - 1) {
      console.log("step")
      setStep("interests")
      return null

    } else {
      setIndex(i + 1)
    }
  }

  return (
    <div className="card">
      <h2>{regionNames[i]}</h2>
      <img src={yes} onClick={() => handleSwipe("like")} alt="like" />
      <img src={no} onClick={() => handleSwipe("dislike")} alt="dislike" />
    </div>
  )
}

export default Card

