import Blog from "./Blog"

const ListOfBlogs = ({blogs, addLikes, remove, user}) => {
  
  
  const orderBlogs = blogs.sort((a,b) => b.likes - a.likes)
  
  return (
    <>
      {orderBlogs.map( (blog) =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes} remove={remove} user={user}/> 
      )}
    </>
  )
}

export default ListOfBlogs