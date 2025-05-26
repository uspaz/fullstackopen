import Blog from "./Blog"

const ListOfBlogs = ({blogs, addLikes}) => {
  
  
  const orderBlogs = blogs.sort((a,b) => b.likes - a.likes)
  
  return (
    <>
      {orderBlogs.map( (blog) =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes}/> 
      )}
    </>
  )
}

export default ListOfBlogs