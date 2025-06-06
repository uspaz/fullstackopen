require("dotenv").config()
const express = require("express")
const app = express()

const Contact = require("./models/mongo")

const cors = require("cors")
app.use(cors())

const morgan = require("morgan")
morgan.token("body", function (req){ return JSON.stringify(req.body) })
app.use(morgan(":body :method :url :response-time"))

app.use(express.static("dist"))
app.use(express.json())



app.get("/api/persons", (req, res, next) => {
    Contact.find({})
        .then( persons => {
            res.json(persons)
        }) 
        .catch( err => next(err))
})

app.get("/api/persons/info", (req, res, next) => {
    Contact.countDocuments({})
        .then( (count) => {
            res.send(`
                <div>
                    <p>Phonebook has info for ${count} people</p>
                    <p>${Date()}</p>
                <div/>
                `
            )
        })
        .catch( err => next(err))
    
})

app.get("/api/persons/:id", (req, res, next) => {
    Contact.findById(req.params.id)
        .then( person => {
            if(person){
                res.json(person)
            }else{
                res.status(404).end()
            }
        })
        .catch( err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then( person => {
            console.info(person.name, "has been removed")
            res.status(204).end()
        })
        .catch( err => next(err))
})


app.post("/api/persons/", (req, res, next) => {
    const body = req.body

    if(body.name && body.phone){
        
        const person = new Contact({
            name: body.name,
            phone: body.phone
        })
    
    
        person.save()
            .then( addPerson => {
                console.info("The contact has been added")
                res.json(addPerson)
            })
            .catch( err => next(err))
        
    }else{
        res.status(400).json({
            error: "All fields must be completed"
        })
    }
    
})

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        phone: body.phone
    }

    Contact.findByIdAndUpdate( req.params.id, person, { new: true, runValudators: true, context: "query" })
        .then( updatePerson => {
            return res.json(updatePerson)
        })
        .catch( err => next(err))
})


const PORT = process.env.PORT
app.listen(PORT)

const handleError = (err, req, res, next) => {
    console.error(err.message)
    

    if(err.name === "CastError"){ 
        return res.status(400).send({ err: "malformatted id"})
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }
    
    next(err)
    
}

app.use(handleError)