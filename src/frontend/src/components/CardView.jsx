import React, {useState} from 'react'

import yes from '../assets/yes.png'
import no from '../assets/no.png'

const Card = ({regions, selectedRegions, setSelectedRegions, setStep}) => {
  console.log("regions: ", selectedRegions)
  const [i, setIndex] = useState(0)

  const handleSwipe = (action) => {
    console.log(i)
    console.log(regions.length)
    if (action === "like") {
      setSelectedRegions(selectedRegions.concat(regions[i]))
    }

    if (i === regions.length - 2) {
      setStep("interests")
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

