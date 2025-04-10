const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]


app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    console.log(req);
    
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
    res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
    const generateId = Math.random().toString(36).substring(2, 10);
    const body = req.body;

    if(!body.name || !body.number){
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
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(persons)
})



const PORT = 3001;
app.listen(PORT);