import React from 'react'

const Login = ( {handleLogin, username, password, setUsername, setPassword} ) => {
  return (
    <form onSubmit={handleLogin} style={{marginTop: "20px"}}>
        <label htmlFor="username">Username:</label>
        <input type="text" id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        <br />
        
        <button type='submit'>Iniciar sesión</button>
    </form>
  )
}

export default Login