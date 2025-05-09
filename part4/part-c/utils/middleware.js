const logger = require("./logger")

const requestLogger = (req, res, next) => {
    logger.info("Method:", req.method)
    logger.info("Path:", req.path)
    logger.info("Body:", req.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

const handleError = (err, req, res, next) => {
    logger.error(err.message)
    

    if(err.name === "CastError"){ 
        return res.status(400).send({ err: "malformatted id"})
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }

    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    
    next(err)
    
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    handleError
}