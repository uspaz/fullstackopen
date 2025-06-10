import { useState } from "react"

const LoginForm = ({login}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

  function handleLogin(e){
    e.preventDefault()
    
    login(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={handleLogin} style={{marginTop: "20px"}}>
        <label htmlFor="username">Username:</label>
        <input type="text" id='username' value={username} onChange={({ target }) => setUsername(target.value)} autoComplete="off"/>
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id='password' value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off"/>
        <br />
        
        <button type='submit'>Iniciar sesión</button>
        
    </form>
  )
}

export default LoginForm