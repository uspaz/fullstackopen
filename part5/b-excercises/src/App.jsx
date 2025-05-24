import { useState, useEffect } from 'react'

import Login from './components/Login'
import ListOfBlogs from './components/ListOfBlogs'
import AddBlogs from './components/AddBlogs'

import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({ 
    title: "", 
    author: "", 
    url: "" 
  })  

    
 


  useEffect(() => {
    const fetchUser = async () => {
      const loggedUser = window.localStorage.getItem("loggedBlogAppUser")
      if(loggedUser){
        const user = JSON.parse(loggedUser)
        setUser(user)
        blogService.setToken(user.token)
        const getBlogs = await blogService.getAll()
        setBlogs( getBlogs )
      }
    }
    
    fetchUser()
    
  }, [])

  async function handleLogin(e){
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")

      const getBlogs = await blogService.getAll()
      setBlogs( getBlogs )
    } catch (error) {
      console.log(error);
      
    }
  }

  function handleLogout(){
    window.localStorage.removeItem("loggedBlogAppUser")
    window.localStorage.clear()
    setUser(null)
  }

  async function addBlogs(e){
    e.preventDefault()
    
    const createBlog = await blogService.create(newBlog)
    setBlogs([...blogs, createBlog])
    setMessage(true)
    setTimeout(() => {
      setMessage(false)
    }, 1500)
  }
  

  return (
    <>
      { !user ?
          <Login handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
        :
        <>
          <h2 style={{display: "inline-block", marginRight: "15px"}}>blogs por {user.name}</h2>
          <button onClick={handleLogout}>Logout</button>  
          <ListOfBlogs blogs={blogs} />
          <h3>Nuevos blogs:</h3>
          <Toggable buttonLabel="new blog" >
            <AddBlogs blog={newBlog} setNewBlog={setNewBlog} addBlogs={addBlogs}/>
          </Toggable>
        </>
      }
      
      {message ? <p>El blog se creo con éxito</p> : null}
    </>
  )
}

export default App