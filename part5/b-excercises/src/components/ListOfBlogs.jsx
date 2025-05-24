import Blog from "./Blog"

const ListOfBlogs = ({blogs, addLikes}) => {
  return (
    <>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes}/> 
    )}
    </>
  )
}

export default ListOfBlogs