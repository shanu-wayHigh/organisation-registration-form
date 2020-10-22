import React from 'react'
import { AppContext } from '../../App'
import './styles.scss'

function OTPSection() {
  const [otp, setOtp] = React.useState([] as any)
  const [error, setError] = React.useState('')
  const { setActiveIndex, setCompletedIndex } = React.useContext(AppContext)

  const handleChange = (event: any) => {
    setOtp([...otp, event.target.value])
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    const joinedOtp = otp.join('')
    const localStorageOtp = localStorage.getItem('otp')
    if (joinedOtp === localStorageOtp) {
      setActiveIndex(3)
      localStorage.clear()
    } else {
      setError('OTP you entered is wrong')
      setOtp([])
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex-column">
          <label className="label-heading otp-heading">Enter your code</label>
          <div className="input-wrapper">
            <input className="input-otp" type="text" onChange={handleChange} />
            <input className="input-otp" type="text" onChange={handleChange} />
            <input className="input-otp" type="text" onChange={handleChange} />
            <input className="input-otp" type="text" onChange={handleChange} />
            <input className="input-otp" type="text" onChange={handleChange} />
          </div>
          {error !== '' && <span className="error">{error}</span>}
        </div>

        <div className="button-wrapper">
          <button
            className="back-button"
            onClick={() => {
              setActiveIndex(0)
              setCompletedIndex('')
            }}
          >
            Back
          </button>
          <button className="otp-button" type="submit">
            Verify
          </button>
        </div>
      </form>
      <div className="separator"></div>
      <div className="just-text">
        Didnt receive the email?Check your spam filter for an email from
        name@domain.com
      </div>
    </>
  )
}

export default OTPSection
