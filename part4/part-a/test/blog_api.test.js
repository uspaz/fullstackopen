const { test, after, beforeEach } = require("node:test")
const assert  = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Blog = require("../models/blog")
const { blogsInDb, initialBlogs, nonExistingId } = require("./blog_helper.test")
const blog = require("../models/blog")


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})  

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()          
})

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})


test("there are one blog", async () => {
    const res = await api.get("/api/blogs")
    
    assert.strictEqual(res.body.length, initialBlogs.length)
})

test("the first blog is about HTTP methods", async () => {
    const res = await api.get("/api/blogs")

    const contents = res.body.map( e => e.title)
    assert(contents.includes("Los juegos del hambre"))
})

test("a valid blog can be added", async () => {
    const newBlog = {
        title: 'Async/await simplifies making async calls',
        author: 'FullStackOpen',
        url: 'http://prueba.com',
        likes: 200
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    const res = await blogsInDb()
    assert.strictEqual(res.length, initialBlogs.length + 1)

    const title = res.map((r) => r.title)
    assert(title.includes("Async/await simplifies making async calls"))
})

test('blog without content is not added', async () => {
    const newBlog = {
      title: "No tiene la estructura necesaria  "
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const res = await blogsInDb()
    
    assert.strictEqual(res.length, initialBlogs.length)
})

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await blogsInDb()
  const blogToView = blogsAtStart[0]

  
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)


  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const res = await blogsInDb()

    const title = res.map((r) => r.title)
    assert(!title.includes(blogToDelete.title))

    assert.strictEqual(res.length, initialBlogs.length - 1)
})


after(async () => {
    await mongoose.connection.close()
})