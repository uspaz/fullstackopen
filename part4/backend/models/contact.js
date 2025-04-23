const mongoose = require("mongoose")

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