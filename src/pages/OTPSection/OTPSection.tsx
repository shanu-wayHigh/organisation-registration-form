import React, { useRef } from 'react'
import { AppContext } from '../../App'
import './styles.scss'

function OTPSection() {
  const [otp, setOtp] = React.useState([] as any)
  const [error, setError] = React.useState('')
  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
  } = React.useContext(AppContext)
  const elementsRef: any = useRef([])

  const handleChange = (event: any) => {
    setOtp([...otp, event?.target.value])
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    const joinedOtp = otp.join('')
    const localStorageOtp = localStorage.getItem('otp')
    if (joinedOtp === localStorageOtp) {
      setActiveIndex(3)
      setCompletedIndex([...completedIndex, 0])
      setCompletedIndex([...completedIndex, 1])
      localStorage.clear()
    } else {
      setError('OTP you entered is wrong')
      setOtp([])
    }
  }

  const renderInput = () => {
    let items = []

    for (let i = 0; i < 5; i++) {
      items.push(
        <input
          className="input-otp"
          maxLength={1}
          type="text"
          onChange={event => handleChange(event)}
          ref={ref => (elementsRef.current[i] = ref)}
          tabIndex={i}
        />
      )
    }
    return items
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex-column">
          <label className="label-heading otp-heading">Enter your code</label>
          <div className="input-wrapper">{renderInput()}</div>
          {error !== '' && <span className="error">{error}</span>}
        </div>

        <div className="button-wrapper">
          <button
            className="back-button"
            onClick={() => {
              setActiveIndex(1)
              setCompletedIndex([...completedIndex, 0])
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
