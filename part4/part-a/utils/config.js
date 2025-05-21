require("dotenv").config()

const mongoURL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_BLOG
  
const PORT = process.env.PORT

module.exports = {
    mongoURL,
    PORT
}

