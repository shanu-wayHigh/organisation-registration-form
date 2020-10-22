import React, { useContext, useState } from 'react'
import { PersonDetailsContext } from '../../pages/PersonalDetails/context'

function Select(props: any) {
  const { options, onChange = () => {}, fields = [], className = '' } = props
  const { formData, setFormData } = useContext(PersonDetailsContext as any)
  const [selectedValue, setSelectedValue] = useState(options[0])

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSelectedValue(value)
    setFormData({ ...formData, [name]: value })
  }

  const selectedVal =
    options.find((item: any) => item.field === selectedValue) || options[0]

  return (
    <>
      <div className="flex-column">
        <label className="label-heading">{fields[0]}</label>
        <select
          name={fields[0]}
          className={`flex-row ${className}`}
          onChange={handleChange}
        >
          {options.map((option: any, index: number) => (
            <option key={`${index}-${option.field}`} value={option.field}>
              {option.field}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-column">
        <label className="label-heading">{fields[1]}</label>
        <select
          name={fields[1]}
          className={`flex-row ${className}`}
          onChange={onChange}
        >
          {selectedVal?.subField?.map((option: any) => {
            return <option>{option}</option>
          })}
        </select>
      </div>
    </>
  )
}

export default Select
