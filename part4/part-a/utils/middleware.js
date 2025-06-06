const logger = require("./logger")
const jwt = require("jsonwebtoken")

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
    console.error(err.message)
    

    if(err.name === "CastError"){ 
        return res.status(400).send({ err: "malformatted id"})
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }
    
    if (err.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }

    if(err.name === "JsonWebTokenError"){
        return res.status(401).json({ error: "token invalid" })
    }

    if(err.name === "TokenExpiredError"){
        return res.status(401).json({
            error: "token expired"
        })
    }

    
    next(err)
    
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.headers.authorization
    
    if(authorization && authorization.startsWith("Bearer ")){
        req.token = authorization.replace("Bearer ", "")
    }
        
    next()
}

const userExtractor = (req, res, next) => {

    const decodedUser = jwt.verify(req.token, process.env.SECRET)
    if(!decodedUser.id){
        return res.status(401).send({ error: "token invalid or expired" })
    }
    req.user = decodedUser;

    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    handleError,
    tokenExtractor,
    userExtractor
}