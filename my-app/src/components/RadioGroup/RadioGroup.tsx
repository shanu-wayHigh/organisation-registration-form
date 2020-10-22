import React, { useContext } from 'react'
import { PersonDetailsContext } from '../../pages/PersonalDetails/context'
import './styles.scss'

function RadioGroup(props: any) {
  const { values = [], onChange = () => {}, className = '' } = props
  const { formData } = useContext(PersonDetailsContext as any)

  return (
    <div className="flex-row">
      {values.length > 0 &&
        values.map((value: any) => (
          <label
            key={value}
            className={`gender-label ${
              formData.gender === value ? 'active-radio' : ''
            }`}
          >
            <input
              className={`radio-button ${className} ${
                formData.gender === value ? 'active-radio' : ''
              }`}
              type="radio"
              name="gender"
              value={value}
              onChange={onChange}
            />
            {value}
          </label>
        ))}
    </div>
  )
}

export default RadioGroup
