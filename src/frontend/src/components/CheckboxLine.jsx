import React, { useState, useEffect } from "react"

const CheckboxLine = ({ field, selectedFields, setSelectedFields }) => {
  const [isSelected, setSelected] = useState(field.selected)

  useEffect(() => {
    setSelected(selectedFields.includes(field.fiName))
  }, [selectedFields, field.fiName])

  const handleCheckboxChange = () => {
    const newSelected = !isSelected
    setSelected(newSelected)

    if (newSelected) {
      setSelectedFields([...selectedFields, field.fiName])
    } else {
      setSelectedFields(selectedFields.filter(f => f !== field.fiName))
    }
  }

  return (
    <div className="checkbox-row">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <p onClick={handleCheckboxChange}>{field.enName}<br></br>{field.fiName}</p>
    </div>
  )
}

export default CheckboxLine
