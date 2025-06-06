const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

noteSchema.set("toJSON", {
transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id
    delete ret.__v
}
})

module.exports = mongoose.model("Note", noteSchema);