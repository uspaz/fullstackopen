require("dotenv").config()
const jwt = require("jsonwebtoken")
const noteRouter = require("express").Router()
const Note = require("../models/note")
const User = require("../models/user")


const getTokenFrom = (req) => {
    const authorization = req.get("authorization")
    if(authorization && authorization.startsWith("Bearer ")){
        return authorization.replace("Bearer ", "")
    }
    return null
}


noteRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})


noteRouter.get("/:id", async (req, res) => {
    const note = await Note.findById(req.params.id)
    note ? res.status(200).json(note) : res.status(404).end()
})

noteRouter.delete("/:id", async (req, res) => {

    await Note.findByIdAndDelete(req.params.id)    
    res.status(204).end()
    
})

noteRouter.post("/", async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    console.log(decodedToken);
    
    if(!decodedToken.id){
        return res.status(401).json({ error: "token invalid" })
    }

    const user = await User.findById(decodedToken.id) 

    if(body.content){
        const note = new Note({
            content: body.content,
            important: body.important || false,
            user: user.id
        })

        const addNote = await note.save()
        user.notes = user.notes.concat(addNote._id)
        await user.save()
        res.status(201).json(addNote)
    
    
    }else{
        return res.status(400).json({
            error: "content missing"
        })
    }

} )

noteRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }

    const note = {
        content: body.content,
        important: body.important
    }

    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: "query"})

    res.status(200).json(updatedNote)
})


module.exports = noteRouter