import React from 'react'
import { AppContext } from '../../App'
import './styles.scss'

function OTPSection() {
  const [otp, setOtp] = React.useState([] as any)
  const [error, setError] = React.useState('')
  const elementsRef: any = Array.from({ length: 5 }, a => React.createRef())
  const [disabled, setDisabled] = React.useState(true)

  const {
    setActiveIndex,
    setCompletedIndex,
    completedIndex,
  } = React.useContext(AppContext)

  const handleChange = (event: any, index: number) => {
    setOtp([...otp, event?.target.value])
    elementsRef[index]?.current?.nextSibling?.focus()
    if(index === 4) {
      setDisabled(false)
    }
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex-column">
          <label className="label-heading otp-heading">Enter your code</label>
          <div className="input-wrapper">
            {new Array(5).fill('').map((item: any, index: number) => {
              return (
                <input
                  className="input-otp"
                  maxLength={1}
                  type="text"
                  onChange={(event: any) => handleChange(event, index)}
                  ref={elementsRef[index]}
                />
              )
            })}
          </div>
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
          <button className="otp-button" disabled={disabled} type="submit">
            Verify
          </button>
        </div>
      </form>
      <div className="separator"></div>
      <div className="just-text">
        Didnt receive the email? Check your spam filter for an email from  
        <span>name@domain.com</span>
      </div>
    </>
  )
}

export default OTPSection
