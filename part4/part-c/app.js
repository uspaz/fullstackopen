const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');

const noteRouter = require("./controllers/notes")
const middleware = require("./utils/middleware");
const logger = require("./utils/logger")
const config = require("./utils/config")

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGO_URI)
    .then( () => {
        logger.info("connected to MongoDB");
    })
    .catch( err =>{
        logger.info("error connecting to MongoDB", err.message);
        
    })

app.use(cors());

app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/notes", noteRouter)

app.use(middleware.handleError)
app.use(middleware.unknownEndpoint)


module.exports = app