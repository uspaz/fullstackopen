const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (req, res, next) => {
    
    const blogs = await Blog.find({}) 
    res.json(blogs)    
})

blogsRouter.get('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id) 
    blog ? res.json(blog) : res.status(404).end

})

blogsRouter.delete('/:id', async (req, res, next) => {

    await Blog.findByIdAndDelete(req.params.id) 
    res.status(204).end()
    
})

blogsRouter.post('/',  async (req, res, next) => {

const blog = new Blog(req.body)

if(blog.title && blog.author && blog.url){
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
    
}else{
    res.status(400).end()
}    

})

module.exports = blogsRouter