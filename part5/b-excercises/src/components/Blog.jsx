import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
          <p>Likes: {blog.likes} - <button >likes</button></p>
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