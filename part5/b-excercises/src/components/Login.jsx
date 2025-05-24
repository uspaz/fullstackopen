import { useState } from 'react'

const Login = ({handleLogin}) => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function login(e){
      e.preventDefault()
      handleLogin({
        username,
        password
      })
    }

  return (
    <form onSubmit={login} style={ {width:"250px", display: "flex", flexDirection:"column", gap:"10px"} }>
        <label htmlFor="">Username:</label>
        <input 
          type="text" 
          id='username' 
          value={username} 
          onChange={({target}) => setUsername(target.value)}
        />

        <label htmlFor="">Password:</label>
        <input 
          type="text" 
          id='password' 
          value={password} 
          onChange={({target}) => setPassword(target.value)}
        />

        <button 
          style={{width: "100px", alignSelf:"center"}} 
          type='submit'>
          Iniciar sesión
        </button>
    </form>
  )
}

export default Login