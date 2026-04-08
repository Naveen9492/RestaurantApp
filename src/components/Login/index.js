import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmitLogin = async e => {
    e.preventDefault()
    const userDetails = {username, password}

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        const {history} = props
        history.replace('/')
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={onSubmitLogin}>
        <h1 className="login-heading">Hey User! Please login</h1>
        <label htmlFor="username" className="label-text-input">
          USERNAME
        </label>
        <input
          className="input-field-login"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          id="username"
        />
        <label htmlFor="password" className="label-text-input">
          PASSWORD
        </label>
        <input
          className="input-field-login"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
