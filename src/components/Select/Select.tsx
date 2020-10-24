import React, { useContext } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PersonDetailsContext } from '../../pages/PersonalDetails/context'

function Select(props: any) {
  const { fields = [], className = '' } = props
  const { formData, setFormData, error, setError } = useContext(
    PersonDetailsContext as any
  )

  const handleChange = (val: any, name: string) => {
    setFormData({ ...formData, [name]: val })
  }

  return (
    <>
      <div className="flex-column focus-within">
        <label className="label-heading">{fields[0]}</label>
        <CountryDropdown
          value={formData.country}
          onChange={val => handleChange(val, 'country')}
          classes={className}
          valueType={'short'}
          name={'country'}
        />
        {error?.country !== '' && <span>{error?.country}</span>}
      </div>
      <div className="flex-column focus-within">
        <label className="label-heading">{fields[1]}</label>
        <RegionDropdown
          country={formData.country}
          value={formData.region}
          onChange={val => handleChange(val, 'region')}
          classes={className}
          countryValueType="short"
        />
      </div>
      <div className="flex-column focus-within">
        <label className="label-heading">Phone</label>
        <div className="align-phone-number">
          <PhoneInput
            country={formData?.country?.toLowerCase() || 'us'}
            value={formData.phone}
            onChange={phone => handleChange(phone, 'phone')}
            inputProps={{ name: 'phone', required: true, autoFocus: true }}
          />
        </div>
      </div>
    </>
  )
}

export default Select
