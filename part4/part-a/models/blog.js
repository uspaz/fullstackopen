const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString()
    delete res._id
    delete res.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)