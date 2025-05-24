import React from 'react'

const Login = ({handleLogin, username, password, setPassword, setUsername}) => {
  return (
    <form onSubmit={handleLogin} style={ {width:"250px", display: "flex", flexDirection:"column", gap:"10px"} }>
        <label htmlFor="">Username:</label>
        <input type="text" id='username' value={username} onChange={({target}) => setUsername(target.value)}/>

        <label htmlFor="">Password:</label>
        <input type="text" id='password' value={password} onChange={({target}) => setPassword(target.value)}/>

        <button style={{width: "100px", alignSelf:"center"}} type='submit'>Iniciar sesión</button>
    </form>
  )
}

export default Login