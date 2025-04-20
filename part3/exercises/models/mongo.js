require("dotenv").config()
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then( () => {
        console.log("connected to MongoDB");
    })
    .catch( err => {
        console.log("error connecting to db", err.message);
        
    })

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String
})

contactSchema.set("toJSON",{
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
})

module.exports = mongoose.model("Contact", contactSchema)