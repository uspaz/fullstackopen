require("dotenv").config()
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then( () => {
        console.info("connected to MongoDB")
    })
    .catch( err => {
        console.error("error connecting to db", err.message)
        
    })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: true
    },
    phone: {
        type: String,
        minLength: 9,
        required: [true, "User phone number required"]
    }
})

contactSchema.set("toJSON",{
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})


module.exports = mongoose.model("Contact", contactSchema)