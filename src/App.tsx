import React from 'react'
import PersonalDetails from './pages/PersonalDetails'
import CompanyDetails from './pages/CompanyDetails'
import OTPSection from './pages/OTPSection'
import './styles.scss'

const AppContext = React.createContext({} as any)

function TabPanel(props: any) {
  const { list = [] } = props
  const { activeIndex, completedIndex } = React.useContext(AppContext)
  console.log({ completedIndex })

  return (
    list.length > 0 &&
    list.map((label: any, index: any) => (
      <div
        key={index}
        className={`tab ${activeIndex === index ? 'active-tab' : ''}`}
      >
        <span className="rounded-number">
          {completedIndex[index] === index ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="#ffffff"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          ) : (
            index + 1
          )}
        </span>
        <span>{label}</span>
      </div>
    ))
  )
}

function App() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [completedIndex, setCompletedIndex] = React.useState([])

  return (
    <AppContext.Provider
      value={{ activeIndex, setActiveIndex, setCompletedIndex, completedIndex }}
    >
      <div className="App">
        <header className="header-panel">
          <TabPanel
            list={['Personal Details', 'Company Details', 'Email Verification']}
          />
        </header>
        <div className="section-wrapper">
          {activeIndex === 0 && (
            <>
              <h1>Add your personal details</h1>
              <h6>Some dummy text</h6>
              <div className="wrapper">
                <section className="personal-details-section">
                  <PersonalDetails />
                </section>
              </div>
            </>
          )}
          {activeIndex === 1 && (
            <>
              <h1>Add your Company details</h1>
              <h6>Some dummy text</h6>
              <div className="wrapper">
                <section className="personal-details-section">
                  <CompanyDetails />
                </section>
              </div>
            </>
          )}
          {activeIndex === 2 && (
            <>
              <h1>Enter your OTP</h1>
              <h6>
                For your verification, we need to verify your identity. We sent
                a 5-digit code from name@domain.com .Please enter it below
              </h6>
              <div className="wrapper">
                <section className="personal-details-section">
                  <OTPSection />
                </section>
              </div>
            </>
          )}
          {activeIndex === 3 && (
            <>
              <h1>Congragulations</h1>
              <h6>You have registered successfully!</h6>
            </>
          )}
        </div>
      </div>
    </AppContext.Provider>
  )
}

export { AppContext }
export default App
