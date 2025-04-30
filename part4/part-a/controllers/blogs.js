const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (req, res, next) => {
    
    const blogs = await Blog.find({}) 
    res.json(blogs)    
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id) 
        blog ? res.json(blog) : res.status(404).end
    } catch (error) {
        next(error)        
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id) 
        res.status(204).end()
    } catch (error) {
        next(error)
    }
    
})

blogsRouter.post('/',  async (req, res, next) => {

const blog = new Blog(req.body)

try {
    if(blog.title && blog.author && blog.likes && blog.url){
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
        
    }else{
        res.status(400).end()
    }
} catch (error) {
    next(error)
}



})

module.exports = blogsRouter