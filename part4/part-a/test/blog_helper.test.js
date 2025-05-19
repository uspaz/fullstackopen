const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Async/await simplifies making async calls',
    author: 'FullStackOpen',
    url: 'http://prueba.com',
    likes: 200,
    user: "682b178ac82763b898f480b6"
  }
]


const nonExistingId = async () => {
  const blog = new Blog({ title:"Los juegos del hambre" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getAuthHeader = async () => {
  const user = await api
        .post("/api/login")
        .send({username: "uspaz", password: "uspaz"})
        .expect(200)
        .expect("Content-Type", /application\/json/)
  
  return user.body
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,getAuthHeader

}