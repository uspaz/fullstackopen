const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const contactRouter = require("./controllers/contacts")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const { default: mongoose } = require("mongoose")

// const morgan = require("morgan")
// morgan.token("body", function (req){ return JSON.stringify(req.body) })
// app.use(morgan(":body :method :url :response-time"))

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then( () => {
        logger.info("connected to MongoDB")
    })
    .catch( (err) => {
        logger.error("error connecting to MongoDB", err.message)
    })


app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/persons", contactRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.handleError)

module.exports = app






