import React from 'react'
import RadioGroup from '../../components/RadioGroup'
import Select from '../../components/Select'
import { PersonDetailsContext } from '../PersonalDetails/context'
import { AppContext } from '../../App'
import './styles.scss'

function PersonalDetails() {
  const [error, setError] = React.useState({} as any)
  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
    updatedFormData,
  } = React.useContext(AppContext)
  const [formData, setFormData] = React.useState({
    gender: 'male',
    ...updatedFormData.personalDetails,
  } as any)

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = (formData: any) => {
    if (!formData.country) {
      setError({ ...error, country: 'Select an option' })
    } else {
      setError({ ...error, country: '' })
    }
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    validateForm(formData)
    localStorage.setItem('personalDetails', JSON.stringify(formData))
    setActiveIndex(1)
    setCompletedIndex([...completedIndex, 0])
  }

  return (
    <PersonDetailsContext.Provider
      value={{ formData, setFormData, error, setError }}
    >
      <form onSubmit={handleFormSubmit}>
        <div className="flex-column">
          <label className="label-heading">Full Name</label>
          <input
            className="input-box"
            type="text"
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            required
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Gender</label>
          <RadioGroup
            className="radio-box"
            values={['male', 'female', 'other']}
            onChange={handleChange}
            value={formData.gender}
          />
        </div>
        <div>
          <Select
            className="select-box"
            fields={['Country', 'State']}
            onChange={handleChange}
          />
        </div>
        <div className="flex-column">
          <button className="submit-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </PersonDetailsContext.Provider>
  )
}

export default PersonalDetails
