
const Login = (props) => {

  return (
    <form onSubmit={props.handleLogin} style={{marginTop: "20px"}}>
        <label htmlFor="username">Username:</label>
        <input type="text" id='username' value={props.username} onChange={({ target }) => props.setUsername(target.value)} autoComplete="off"/>
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id='password' value={props.password} onChange={({ target }) => props.setPassword(target.value)} autoComplete="off"/>
        <br />
        
        <button type='submit'>Iniciar sesión</button>
        
    </form>
  )
}

export default Login