const express = require('express')
require("express-async-errors")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

const userRouter = require('./controllers/users')
const blogRouter = require("./controllers/blogs")
const loginRouter = require('./controllers/login')


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
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.handleError)

module.exports = app
