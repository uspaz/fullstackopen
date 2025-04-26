const contactRouter = require("express").Router()
const Contact = require("../models/contact")


contactRouter.get("/", (req, res, next) => {
    Contact.find({})
        .then( persons => {
            res.json(persons)
        }) 
        .catch( err => next(err))
})

contactRouter.get("/info", (req, res, next) => {
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

contactRouter.get("/:id", (req, res, next) => {
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

contactRouter.delete("/:id", (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then( person => {
            console.info(person.name, "has been removed")
            res.status(204).end()
        })
        .catch( err => next(err))
})


contactRouter.post("/", (req, res, next) => {
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

contactRouter.put("/:id", (req, res, next) => {
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

module.exports = contactRouter