// const http = require("http");
require("dotenv").config()
const express = require("express");
const app = express();
const Note = require("./models/note")

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.static("dist"));



// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]

// const app = http.createServer( (req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(notes));
// }) 


// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id ))
//     : 0
//   return maxId + 1;
// } 

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then( notes => {
    res.json(notes)
  })
})

app.get("/api/notes/:id", (req, res) => {

  Note.findById(req.params.id).then( note => {
    note ? res.json(note) : res.status(404).end();
  })
})

app.delete("/api/notes/:id", (req, res) => {
  
  Note.findByIdAndDelete(req.params.id)
    .then( note =>{
      res.status(204).end()
  })
    
    
})

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if(!body.content){
    return res.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then( addNote => {
    res.json(addNote)
  })
} )

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = notes.find(n => n.id == id)
  if (!note) {
    return res.status(404).json({ error: 'note not found' })
  }

  const updatedNote = { ...note, important: body.important }
  notes = notes.map(n => n.id != id ? n : updatedNote)

  res.json(updatedNote)
})

const PORT = process.env.PORT
app.listen(PORT);
console.log(`Server running on port ${PORT}`)