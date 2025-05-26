import { useState } from "react"

const Blog = ({ blog, addLikes, remove, user}) => {
  const [visible, setVisible] = useState(false)

  console.log(blog);
  
    
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleLikes = () => {
    addLikes(blog.id, { 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const styling = { marginLeft: "10px"}
  
  return (
    <div style={{ border: "1px solid", paddingLeft: "10px", width: "400px", marginBottom: "10px"}}>
      { visible ?
        <>
          <p>
            {blog.title}
            <button style={styling} onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
          </p>
          <p>realizado por {blog.author}</p>
          <a href="http://localhost:5173/">{blog.url}</a>
          <p>Likes: {blog.likes} - <button onClick={handleLikes}>likes</button></p>
          {blog.user.id === user ? 
            (<button 
                style={{ marginBottom: "10px"}}
                onClick={() => remove(blog.id)}>
                Eliminar
              </button>) 
            : 
            ""
          }
        </>
        :
        <div >
          <p>
            {blog.title}
            <button style={styling} onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
          </p>
          
        </div>
      }
      
    </div>  
)
}

export default Blog