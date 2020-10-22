import React from 'react'
import RadioGroup from '../../components/RadioGroup'
import Select from '../../components/Select'
import { PersonDetailsContext } from '../PersonalDetails/context'
import { AppContext } from '../../App'
import './styles.scss'

function PersonalDetails() {
  const [formData, setFormData] = React.useState({ gender: 'male' } as any)
  const [error, setError] = React.useState({} as any)
  const { setActiveIndex } = React.useContext(AppContext)

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const options = [
    {
      field: 'India',
      subField: ['TamilNadu', 'Karnataka', 'Kerala'],
    },
    {
      field: 'USA',
      subField: ['America', 'Heh', 'hhh'],
    },
  ]
  const validateForm = (formData: any) => {
    console.log({ formData })
    if (!formData.fullName) {
      setError({ ...error, fullName: 'Name field is required' })
    }
    if (!formData.gender) {
      setError({ ...error, gender: 'Select any one gender' })
    }
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    validateForm(formData)
    localStorage.setItem('personalDetails', JSON.stringify(formData))
    setActiveIndex(1)
  }

  return (
    <PersonDetailsContext.Provider value={{ formData, setFormData }}>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-column">
          <label className="label-heading">Full Name</label>
          <input
            className="input-box"
            type="text"
            name="fullName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Gender</label>
          <RadioGroup
            className="radio-box"
            values={['male', 'female', 'other']}
            onChange={handleChange}
          />
        </div>
        <div>
          <Select
            className="select-box"
            options={options}
            fields={['Country', 'State']}
            onChange={handleChange}
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Phone Number</label>
          <input
            className="input-box"
            name="phoneNumber"
            type="number"
            onChange={handleChange}
            required
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
