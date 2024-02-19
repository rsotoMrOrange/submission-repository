import PropType from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  onChangeUsername,
  onChangePassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={onChangeUsername}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="text"
          value={password}
          name="Password"
          onChange={onChangePassword}
        />
      </div>
      <button id='login-button' type='submit'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropType.func.isRequired,
  username: PropType.string.isRequired,
  password: PropType.string.isRequired,
  onChangeUsername: PropType.func.isRequired,
  onChangePassword: PropType.func.isRequired
}

export default LoginForm