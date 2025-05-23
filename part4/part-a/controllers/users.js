const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1})
    res.status(200).json(users)
})

userRouter.delete("/", async (req, res) => {
    await User.deleteMany({})
    res.status(202).end()
})

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body

    if(!password){
        return res.status(401).json({ error: "password is required"})
    }

    const existing = await User.findOne({ username })
    if(existing){ return res.status(400). json({ error: "expected username to be unique"})}

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter