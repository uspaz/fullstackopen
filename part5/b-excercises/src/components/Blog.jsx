const Blog = ({ blog }) => (
  <div>
    <p>{blog.title}, realizado por {blog.author} - <a href="http://localhost:5173/">{blog.url}</a></p>
  </div>  
)

export default Blog