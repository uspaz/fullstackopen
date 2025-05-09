const { test, describe, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")

const User = require("../models/note")
const { notesInDb, initalNotes, usersInDb } = require("./test_helper.test")


describe("cuando inicialmente hay un usuario en la db", () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", passwordHash })

        await user.save()
    })

    test("con un nuevo nombre de usuario", async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: "nashee",
            name: "Matias",
            password: "loquita123"
        }
        
        await api
            .post("/api/user")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await usersInDb()
        console.log(usersAtEnd);
        
        
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

    })

    test("creación falla de forma correcta por unicidad de username", async () => {
        const usersAtStart = await usersInDb()

        
        const newUser = {
            username: "root",
            name: "Superuser",
            password: "root"
        }
        
        const result = await api
        .post("/api/user")
        .send(newUser)
        .expect(400)
        
        const usersAtEnd = await usersInDb()
        
        assert(result.body.error.includes(`expected "username" to be unique`))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})