import React, {useState, useEffect} from 'react'

import yes from '../assets/yes.png'
import no from '../assets/no.png'

const Card = ({regions, selectedRegions, setSelectedRegions, setStep}) => {
  console.log("regions: ", selectedRegions)
  const [i, setIndex] = useState(0)


  useEffect(() => {
    if (i === regions.length -1) {
    setStep("interests")
    }
  }, [i])

 
  const handleSwipe = (action) => {
    if (action === "like") {
      setSelectedRegions([...selectedRegions, regions[i]])
    }

    if (i === regions.length - 1) {
      console.log("step")
      setStep("interests")
      return null
      
    } else {
      setIndex(i+1)
    }
  }

  return (
    <div className="card">
      <h2>{regions[i]}</h2>
      <img src={yes} onClick={() => handleSwipe("like")} alt="like" />
      <img src={no} onClick={() => handleSwipe("dislike")} alt="dislike" />
    </div>
  )
}

export default Card

