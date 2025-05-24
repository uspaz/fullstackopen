
const AddBlogs = ({blog, setNewBlog,addBlogs}) => {
  return (
    <form onSubmit={addBlogs}>
        
        <label htmlFor="title">Titulo:</label>
        <input type="text" id="title" style={{ margin: "8px 0px", width: "225px"}} value={blog.title} onChange={({target}) => setNewBlog({...blog, title: target.value})}/>
        <br />

        <label htmlFor="author">Autor:</label>
        <input type="text" id="author" style={{ margin: "8px 0px", width: "225px"}} value={blog.author} onChange={({target}) => setNewBlog({...blog, author: target.value})}/>
        <br />
        
        <label htmlFor="url">Url:</label>
        <input type="text" id="url" style={{ margin: "8px 0px", width: "225px"}} value={blog.url} onChange={({target}) => setNewBlog({...blog, url: target.value})}/>
        <br />

        <button type="submit" style={{ width: "100px", padding: "4px", cursor: "pointer"}} >Crear</button>
    </form>
  )
}

export default AddBlogs