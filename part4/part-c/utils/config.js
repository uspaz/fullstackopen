require("dotenv").config()

const MONGO_URI = process.env.MONGODB_URI

const PORT = process.env.PORT

module.exports = {
    MONGO_URI,
    PORT
}

