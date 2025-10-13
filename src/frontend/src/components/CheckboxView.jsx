import React, { useState } from "react"
import CheckboxLine from "./CheckboxLine"

const CheckboxView = ({ hierarchy, selectedFields, setSelectedFields, setStep }) => {

  const texts = [[
    "Pick the fields of study you are interested in! (1/3)",
    "Valitse ne koulutusalat, jotka kiinnostavat sinua! (1/3)"],
  ["Pick the fields of study you are interested in! (2/3)",
    "Valitse ne koulutusalat, jotka kiinnostavat sinua! (2/3)",
    "(the options are based on the choices you made on the last page)",
    "(vaihtoehdot pohjautuvat edellisellä sivulla tekemiin päätöksiisi)"],
  ["Pick the fields of study you are interested in! (3/3)",
    "Valitse ne koulutusalat, jotka kiinnostavat sinua! (3/3)",
    "(the options are based on the choices you made on the last pages)",
    "(vaihtoehdot pohjautuvat edellisillä sivuilla tekemiin päätöksiisi)]"]]

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
      {texts[level - 1].map(p => <span className="instructions">{p}</span>)}
      <div className="checkbox-list">
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
      </div>
      <button
        onClick={nextLevel}
      >
        Next
      </button>
    </div>
  )
}

export default CheckboxView
