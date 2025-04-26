require("dotenv").config()

const mongoURL = process.env.mongoURL
const PORT = process.env.PORT

module.exports = {
    mongoURL,
    PORT
}

