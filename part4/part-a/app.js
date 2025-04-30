const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require("./utils/config")
const logger = require("./utils/logger")
const blogRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")


mongoose.set("strictQuery", false)

logger.info("Conneting to MongoDB")

mongoose.connect(config.mongoURL)
    .then( () => {
        logger.info("connected to MongoDB")
    })
    .catch( (err) => {
        logger.error("error connecting to MongoDB", err.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.handleError)

module.exports = app
