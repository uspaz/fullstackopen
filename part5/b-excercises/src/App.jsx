import { useState, useEffect } from "react"

import Login from "./components/Login"
import ListOfBlogs from "./components/ListOfBlogs"
import AddBlogs from "./components/AddBlogs"

import blogService from "./services/blogs"
import loginService from "./services/login"
import Toggable from "./components/Toggable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)



    useEffect(() => {
        const fetchUser = async () => {
            const loggedUser = window.localStorage.getItem("loggedBlogAppUser")
            if(loggedUser){
                const user = JSON.parse(loggedUser)
                setUser(user)


                blogService.setToken(user.token)
                const getBlogs = await blogService.getAll()
                setBlogs( getBlogs)
            }
        }

        fetchUser()

    }, [])


    function handleLogout(){
        window.localStorage.removeItem("loggedBlogAppUser")
        window.localStorage.clear()
        setUser(null)
    }

    const createBlog = async (newObject) => {
        const createBlog = await blogService.create(newObject)
        setBlogs(prevBlogs => [...prevBlogs, createBlog])
        setMessage(true)
        setTimeout(() => setMessage(false), 1500)
    }

    const handleLogin = async (newObject) => {
        try {
            const user = await loginService.login(newObject)

            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)

            const getBlogs = await blogService.getAll()
            setBlogs( getBlogs )
        } catch (error) {
            console.log(error)

        }
    }

    const addLikes = async (id, newObject) => {
        const updatedBlog = await blogService.update(id, newObject)
        setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog))
    }

    const handleRemove = async (id) => {
        if(window.confirm("Borrar blog")){
            await blogService.remove(id)
            setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== id))
        }
    }


    return (
        <>
            { !user ?
                <Login handleLogin={handleLogin} />
                :
                <>
                    <h2 style={{ display: "inline-block", marginRight: "15px" }}>blogs por {user.name}</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <ListOfBlogs blogs={blogs} addLikes={addLikes} remove={handleRemove} user={user.id} />
                    <h3>Nuevos blogs:</h3>
                    <Toggable buttonLabel="new blog" >
                        <AddBlogs createBlog={createBlog}/>
                    </Toggable>
                </>
            }

            {message ? <p>El blog se creo con éxito</p> : null}
        </>
    )
}

export default App