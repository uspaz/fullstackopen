const { test, after, beforeEach, describe } = require("node:test")
const assert  = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const { usersInDb } = require("./blog_helper.test")
const User = require("../models/user")


describe("creación de usuarios y validaciones", () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", passwordHash })

        await user.save()
    })

    test("comprobando contraseña y username", async () => {
        const usersAtStart = await usersInDb()
        console.log(usersAtStart);
        
        const newUser = {
            username: "mt",
            name: "Matias",
            password: "12345"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        const usersAtEnd = await usersInDb()
        
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})