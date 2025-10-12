import React, { useState } from "react"
import CheckboxLine from "./CheckboxLine"

const CheckboxView = ({ hierarchy, selectedFields, setSelectedFields, setStep}) => {
  const [currentNodes, setCurrentNodes] = useState(Object.values(hierarchy))
  const [level, setLevel] = useState(1)

  const nextLevel = () => {
    if (level === 1 || level === 2) {
      const nextNodes = selectedFields
        .map(sel => {
          const node = currentNodes.find(n => n.name["fi"] === sel)
          return node?.children ? Object.values(node.children) : []
        })
        .flat()

      if (nextNodes.length > 0) {
        setCurrentNodes(nextNodes)
        setSelectedFields([])
        setLevel(level + 1)
      } else {
        setStep("results")
      }
    } else if (level === 3) {
      setStep("results")
    }
  }

  return (
    <div className="checkbox-view">
      {currentNodes.map((node, idx) => (
        <CheckboxLine
          key={`${level}-${idx}`}
          field={{
            enName: node.name["en"],
            fiName: node.name["fi"],
            selected: selectedFields.includes(node.name["en"]),
          }}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
        />
      ))}
      <button
        onClick={nextLevel}
      >
        Next
      </button>
    </div>
  )
}

export default CheckboxView
