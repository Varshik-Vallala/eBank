import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    isFailure: false,
    errorMessage: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state

    return (
      <>
        <label className="label-name" htmlFor="userId">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          onChange={this.onChangeUserId}
          value={userId}
          placeholder="Enter User Id"
          className="input-element"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-name" htmlFor="password">
          PIN
        </label>
        <input
          type="password"
          id="password"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Enter PIN"
          className="input-element"
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = errorMessage => {
    // Cookies.set(
    //   'jwt_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE0MjQyMCIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjM0MDk4NzYyfQ.ZUCC2J2zBjRhLVa1EI_4EnkZ-M-7hoVZoZFAu8GTmEQ',
    // )
    this.setState({isFailure: true, errorMessage})
  }

  submitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    // const username = userId
    // const password = pin

    const userDetails = {userId, pin}

    // const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    console.log(options)

    const url = 'https://apis.ccbp.in/ebank/login'
    // const url = 'https://myapp-authentication.herokuapp.com/login'

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }

    console.log(response)
    console.log(data)
  }

  render() {
    const {isFailure, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-page-image"
          />
          <form className="from-container" onSubmit={this.submitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="input-container">{this.renderUserId()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            {isFailure ? <p className="error-message">{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
