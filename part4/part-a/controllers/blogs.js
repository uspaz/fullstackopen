const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (req, res) => {
    
    const blogs = await Blog.find({}) 
    res.json(blogs)    
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id) 
    blog ? res.json(blog) : res.status(404).end

})

blogsRouter.delete('/:id', async (req, res) => {

    await Blog.findByIdAndDelete(req.params.id) 
    res.status(204).end()
    
})

blogsRouter.post('/',  async (req, res) => {

const blog = new Blog(req.body)

if(blog.title && blog.author && blog.url){
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
    
}else{
    res.status(400).end()
}    

blogsRouter.put("/:id", async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updateBlog = await Blog.findByIdAndUpdate( req.params.id, blog, {new: true, runValidators: true, context: "query"})

    res.status(202).json(updateBlog)
})

})

module.exports = blogsRouter