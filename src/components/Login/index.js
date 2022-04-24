import {Component} from 'react'

class Login extends Component {
  state = {
    userId: '',
    password: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state

    return (
      <>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          onChange={this.onChangeUserId}
          value={userId}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()

    const {userId, password} = this.state

    const userDetails = {userId, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      //   Content-type: {'application/json'}
    }

    console.log(options)

    const url = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(url, options)

    if (response.ok === true) {
      this.onSubmitSuccess()
    }

    const data = await response.json()

    console.log(response)
    console.log(data)
  }

  render() {
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt=" login"
          />
          <form onSubmit={this.submitForm}>
            <h1>Welcome Back!</h1>
            <div>{this.renderUserId()}</div>
            <div>{this.renderPassword()}</div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
