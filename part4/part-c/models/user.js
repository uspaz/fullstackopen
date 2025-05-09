const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()

        delete ret._id
        delete ret.__v
        delete ret.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)