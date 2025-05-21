import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ListOfBlogs from './components/ListOfBlogs'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogAppUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    
  }, [])

  async function handleLogin(e){
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <>
      { !user ?
          <Login handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
        :
        <>
          <h2>blogs</h2>
          <ListOfBlogs blogs={blogs} />    
        </>
      }
      
      
    </>
  )
}

export default App