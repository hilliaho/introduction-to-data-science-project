import React, { useState, useEffect } from "react"
import CheckboxLine from "./CheckboxLine"

const CheckboxView = ({ hierarchy, selectedFields, setSelectedFields, step, setStep }) => {
  const [fieldNames, setFieldNames] = useState(Object.keys(hierarchy))
  const [level, setLevel] = useState(1)

  useEffect(() => {
    if (step === "results") {
      console.log("Step vaihtui tuloksiin!")
    }
  }, [step])


  const getKeysOrValues = (value) => {
    if (Array.isArray(value)) {
      return value
    } else if (typeof value === "object" && value !== null) {
      return Object.keys(value)
    } else {
      return []
    }
  }


  const nextLevel = () => {
    if (level === 1) {
      const newFieldNames = selectedFields.flatMap(n => Object.keys(hierarchy[n] || {}))
      setFieldNames(newFieldNames)
      setSelectedFields([])
      setLevel(2)
    } else if (level === 2) {
      const newFieldNames = selectedFields.flatMap(n =>
        Object.values(hierarchy)
          .flatMap(h => getKeysOrValues(h[n]))
      )
      setFieldNames(newFieldNames)
      setSelectedFields([])
      setLevel(3)
    }
    else if (level === 3) {
      setStep("results")
    }
  }

  return (
    <div>
      {fieldNames.map(key => (
        <CheckboxLine
          key={`${level}-${key}`}
          field={{ name: key, selected: false }}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
        />
      ))}
      <button onClick={nextLevel}>Next</button>
    </div>
  )
}

export default CheckboxView
