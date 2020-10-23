import React from 'react'
import * as emailjs from 'emailjs-com'
import ImageUpload from '../../components/ImageUpload'
import { AppContext } from '../../App'
import { CompanyDetailsContext } from './context'
import './styles.scss'

emailjs.init('user_zjkxUiBwWLTcgOOXPaXu0')

function CompanyDetails() {
  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
    updatedFormData,
    setUpdatedFormData,
  } = React.useContext(AppContext)
  const [formData, setFormData] = React.useState(
    updatedFormData.companyDetails as any
  )

  const handleChange = (event: any) => {
    const { value, name, type, checked = false } = event.target
    type === 'checkbox'
      ? setFormData({ ...formData, [name]: checked })
      : setFormData({ ...formData, [name]: value })
  }

  const generateOTP = () => {
    const digits = '0123456789'
    let otp = ''
    for (let i = 0; i < 5; i++) {
      otp += digits[Math.floor(Math.random() * 10)]
    }
    return otp
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    localStorage.setItem('companyDetails', JSON.stringify(formData))
    const otp = generateOTP()
    localStorage.setItem('otp', otp)
    let templateParams = {
      otp: otp,
      emailId: formData.emailId,
    }
    emailjs.send('service_pvpyyqj', 'template_a7ielqb', templateParams)
    setActiveIndex(2)
    setCompletedIndex([...completedIndex, 0])
    setCompletedIndex([...completedIndex, 1])
    const companyDetails = JSON.parse(
      localStorage.getItem('companyDetails') as any
    )
    setUpdatedFormData({
      ...updatedFormData,
      companyDetails: companyDetails,
    })
  }

  return (
    <CompanyDetailsContext.Provider value={{ formData, setFormData }}>
      <form onSubmit={handleSubmit}>
        <div className="flex-column">
          <ImageUpload />
        </div>
        <div className="flex-column">
          <label className="label-heading">Company Name</label>
          <input
            className="input-box"
            type="text"
            name="companyName"
            onChange={handleChange}
            value={formData?.companyName}
            required
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Email Id</label>
          <input
            className="input-box"
            type="email"
            name="emailId"
            onChange={handleChange}
            value={formData?.emailId}
            required
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Job Title</label>
          <input
            className="input-box"
            type="text"
            name="jobTitle"
            onChange={handleChange}
            value={formData?.jobTitle}
            required
          />
        </div>
        <div className="flex-column">
          <label className="label-heading">Years of Experience</label>
          <input
            className="input-box"
            type="text"
            name="experience"
            onChange={handleChange}
            value={formData?.experience}
            required
          />
        </div>
        <div className="flex-row margin-bottom-1">
          <input
            className="check-box"
            type="checkbox"
            name="acceptTermsAndConditions"
            onChange={handleChange}
            checked={formData?.acceptTermsAndConditions}
            required
          />
          <label className="terms-conditions-text">
            I accept the{' '}
            <a className="terms-conditions" href="/">
              terms and conditions
            </a>
          </label>
        </div>
        <div className="button-wrapper">
          <button
            className="back-button"
            onClick={() => {
              setActiveIndex(0)
              setCompletedIndex([])
              const personalDetails = JSON.parse(
                localStorage.getItem('personalDetails') as any
              )
              setUpdatedFormData({
                ...updatedFormData,
                personalDetails: personalDetails,
              })
            }}
          >
            Back
          </button>
          <button className="otp-button" type="submit">
            Send OTP
          </button>
        </div>
      </form>
    </CompanyDetailsContext.Provider>
  )
}

export default CompanyDetails
