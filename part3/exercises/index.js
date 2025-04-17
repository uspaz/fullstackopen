const express = require("express");
const morgan = require("morgan")
const app = express();
const cors = require("cors")

morgan.token("body", function (req, res){ return JSON.stringify(req.body) })

app.use(cors())
app.use(express.static("dist"))
app.use(morgan(":body :method :url :response-time"))
app.use(express.json());

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      phone: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      phone: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      phone: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      phone: "39-23-6423122"
    }
]


app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    
    res.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${Date()}</p>
        <div/>
        `
    )
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find( person => person.id == id)
    
    if(persons){
        res.json(person);
    }else{

        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter( person => person.id != id)

    res.json(persons)
})


app.post("/api/persons/", (req, res) => {
    const generateId = Math.random().toString(36).substring(2, 10);
    const body = req.body;

    if(!body.name || !body.phone){
        res.status(400).json({
            error: "Deben completarse todos los campos"
        })
    }else if(persons.find( person => person.name == body.name)){
        res.status(400).json({
            error: "El nombre debe ser único"
        })
    }

    const newPerson = {
        id: generateId,
        name: body.name,
        phone: body.phone
    }

    persons = persons.concat(newPerson)
    res.json(persons)
})



const PORT = 3001;
app.listen(PORT);