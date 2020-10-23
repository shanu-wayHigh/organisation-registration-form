import React from 'react'
import emojiFlags from 'emoji-flags'
import RadioGroup from '../../components/RadioGroup'
import Select from '../../components/Select'
import { PersonDetailsContext } from '../PersonalDetails/context'
import { AppContext } from '../../App'
import './styles.scss'

const options: any = [
  {
    field: 'India',
    flag: emojiFlags.countryCode('IN').emoji,
    subField: ['TamilNadu', 'Karnataka', 'Kerala'],
    code: '+91',
  },
  {
    field: 'United States',
    flag: emojiFlags.countryCode('US').emoji,
    subField: ['America', 'England', 'New York'],
    code: '+1',
  },
]

function PersonalDetails() {
  const [formData, setFormData] = React.useState({
    gender: 'male',
    country: options[0].field as any,
    state: 'TamilNadu',
  } as any)
  const [error, setError] = React.useState({} as any)
  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
  } = React.useContext(AppContext)

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = (formData: any) => {
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
    setCompletedIndex([...completedIndex, 0])
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
          <button className="submit-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </PersonDetailsContext.Provider>
  )
}

export default PersonalDetails
