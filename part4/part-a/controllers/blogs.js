const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require('../models/user')



blogsRouter.get('/', async (req, res) => {
    
    const blogs = await Blog.find({})
    res.json(blogs)    
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id) 
    blog ? res.json(blog) : res.status(404).end

})

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if(blog === null) return res.status(404).json({ error: "no existe ningún blog" })
    
    if(req.user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()

    }else{
        res.status(401).json({
            error: "no tiene permisos"
        })
    }

    
})

blogsRouter.post('/',  async (req, res) => {
    const body = req.body    

    if(!req.user.id){
        return res.status(401).json({
            error: "token invalid"
        })
    }

    const user = await User.findById(req.user.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id 
    })


    if(blog.title && blog.author && blog.url){
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)
        
    }else{
        res.status(400).end()
    }  
})

blogsRouter.put("/:id", async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updateBlog = await Blog.findByIdAndUpdate( req.params.id, blog, {new: true, runValidators: true, context: "query"})

    res.status(202).json(updateBlog)
})


module.exports = blogsRouter