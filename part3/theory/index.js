// const http = require("http");
const express = require("express");
const app = express();

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static("dist"))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

// const app = http.createServer( (req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(notes));
// }) 


const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id ))
    : 0
  return maxId + 1;
} 




app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id
  const note = notes.find(note => note.id == id)

  if(note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id != id)
  res.status(204).end()
})

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if(!body.content){
    return res.status(400).json({
      error: "content missing"
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }

  notes = notes.concat(note)
  
  res.json(note)
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

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`)