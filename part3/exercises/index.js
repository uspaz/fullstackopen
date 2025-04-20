require("dotenv").config()

const express = require("express");
const app = express();

const Contact = require("./models/mongo")

const cors = require("cors")
app.use(cors())

const morgan = require("morgan")
morgan.token("body", function (req, res){ return JSON.stringify(req.body) })
app.use(morgan(":body :method :url :response-time"))

app.use(express.static("dist"))
app.use(express.json());



app.get("/api/persons", (req, res) => {
    Contact.find({})
        .then( persons => {
            res.json(persons)
        }) 
})

// app.get("/info", (req, res) => {
    
//     res.send(`
//         <div>
//             <p>Phonebook has info for ${persons.length} people</p>
//             <p>${Date()}</p>
//         <div/>
//         `
//     )
// })

app.get("/api/persons/:id", (req, res) => {
    Contact.findById(req.params.id)
        .then( person => {
            if(person){
                res.json(person);
            }else{
                res.status(404).end()
                return;
            }
        })
})

app.delete("/api/persons/:id", (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then( person => {
            console.log(person.name, "has been removed");
            return res.json(person)
        } )

    
})


app.post("/api/persons/", (req, res) => {
    const body = req.body;    

    if(body.name && body.phone){

        
        Contact.findOne({ name: body.name }).then( result => {

            
            if(result){
                
                console.log("The name has been unique");
                res.status(400).end()
                return;
            }

            const person = new Contact({
                name: body.name,
                phone: body.phone
            })
        
        
            person.save().then( addPerson => {
                console.log("The contact has been added");
                res.json(addPerson)
            } )
        })
        
    }else{
        res.status(400).json({
            error: "All fields must be completed"
        })
    }
    
})



const PORT = process.env.PORT;
app.listen(PORT);