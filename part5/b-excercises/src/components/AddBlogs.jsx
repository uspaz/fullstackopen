
const AddBlogs = ({createBlog}) => {
  const [newBlog, setNewBlog] = useState({ 
    title: "", 
    author: "", 
    url: "" 
  })  

   const handleBlogs = (e) => {
    e.preventDefault()
    createBlog(newBlog)
  }

  return (
    <form onSubmit={handleBlogs}>
        
        <label htmlFor="title">Titulo:</label>
        <input 
          type="text" 
          id="title" 
          style={{ margin: "8px 0px", width: "225px"}} 
          value={newBlog.title} 
          onChange={({target}) => setNewBlog({...blog, title: target.value})}/>
        <br />

        <label htmlFor="author">Autor:</label>
        <input 
          type="text" 
          id="author" 
          style={{ margin: "8px 0px", width: "225px"}} 
          value={newBlog.author} 
          onChange={({target}) => setNewBlog({...blog, author: target.value})}/>
        <br />
        
        <label htmlFor="url">Url:</label>
        <input 
          type="text" 
          id="url" 
          style={{ margin: "8px 0px", width: "225px"}} 
          value={newBlog.url} 
          onChange={({target}) => setNewBlog({...blog, url: target.value})}/>
        <br />

        <button 
          type="submit" 
          style={{ width: "100px", padding: "4px", cursor: "pointer"}}>
          Crear
        </button>
    </form>
  )
}

export default AddBlogs