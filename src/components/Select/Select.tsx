import React, { useContext, useState } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PersonDetailsContext } from '../../pages/PersonalDetails/context'

function Select(props: any) {
  const { fields = [], className = '' } = props
  const { formData, setFormData } = useContext(PersonDetailsContext as any)
  const [country, setCountry] = React.useState('')
  const [shortCountry, setShortCountry] = React.useState('')
  const [region, setRegion] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const selectCountry = (val: any) => {
    setCountry(val)
    setFormData({ ...formData, country: val })
  }

  const selectRegion = (val: any) => {
    setRegion(val)
    setFormData({ ...formData, region: val })
  }

  const selectPhone = (val: any) => {
    setPhone(val)
    setFormData({ ...formData, phone: val })
  }
  console.log({ country })
  return (
    <>
      <div className="flex-column">
        <label className="label-heading">{fields[0]}</label>
        <CountryDropdown
          value={country}
          onChange={val => selectCountry(val)}
          classes={className}
          valueType={'short'}
        />
      </div>
      <div className="flex-column">
        <label className="label-heading">{fields[1]}</label>
        <RegionDropdown
          disableWhenEmpty={true}
          country={country}
          value={region}
          onChange={val => selectRegion(val)}
          classes={className}
          countryValueType="short"
        />
      </div>
      <div className="flex-column">
        <label className="label-heading">Phone Number</label>
        <div className="align-phone-number">
          <PhoneInput
            country={country.toLowerCase()}
            value={phone}
            onChange={phone => selectPhone(phone)}
          />
        </div>
      </div>
    </>
  )
}

export default Select
