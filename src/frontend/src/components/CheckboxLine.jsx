import React, { useState, useEffect } from "react"

const CheckboxLine = ({ field, selectedFields, setSelectedFields }) => {
  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(field.selected)
  }, [field.selected])

  useEffect(() => {
    setSelected(selectedFields.includes(field.name))
  }, [selectedFields, field.name])


  const handleCheckboxChange = () => {
    const newSelected = !isSelected
    setSelected(newSelected)

    if (newSelected) {
      setSelectedFields([...selectedFields, field.name])
    } else {
      setSelectedFields(selectedFields.filter(f => f !== field.name))
    }
  }


  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      {<p>{field.name}</p>}
    </div>
  )
}

export default CheckboxLine
