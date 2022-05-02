import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onLogoutClicked = () => {
    console.log('clicked')
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-page-container">
      <nav className="navbar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button
          className="logout-button"
          type="button"
          onClick={onLogoutClicked}
        >
          Logout
        </button>
      </nav>
      <div className="user-account-details">
        <h1 className="greeting-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}
export default Home
