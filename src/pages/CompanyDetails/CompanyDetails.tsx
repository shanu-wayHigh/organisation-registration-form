import React from 'react'
import * as emailjs from 'emailjs-com'
import ImageUpload from '../../components/ImageUpload'
import { AppContext } from '../../App'
import { CompanyDetailsContext } from './context'
import './styles.scss'

emailjs.init('user_zjkxUiBwWLTcgOOXPaXu0')

function CompanyDetails() {
  const [formData, setFormData] = React.useState({} as any)
  const [error] = React.useState({} as any)
  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
  } = React.useContext(AppContext)

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
    emailjs.send('service_pvpyyqj', 'template_a7ielqb', templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
    setActiveIndex(2)
    setCompletedIndex([...completedIndex, 0])
    setCompletedIndex([...completedIndex, 1])
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
            required
          />
          {error.companyName === '' && (
            <span className="error">{error.companyName}</span>
          )}
        </div>
        <div className="flex-column">
          <label className="label-heading">Email Id</label>
          <input
            className="input-box"
            type="email"
            name="emailId"
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="flex-row margin-bottom-1">
          <input
            className="check-box"
            type="checkbox"
            name="acceptTermsAndConditions"
            onChange={handleChange}
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
