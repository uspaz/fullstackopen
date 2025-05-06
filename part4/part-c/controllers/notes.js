const noteRouter = require("express").Router()
const Note = require("../models/note")


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

    if(body.content){
        const note = new Note({
            content: body.content,
            important: body.important || false,
        })

        const addNote = await note.save()
        res.json(addNote)
    
    
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