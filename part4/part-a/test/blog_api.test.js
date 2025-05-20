const { test, after, beforeEach, describe } = require("node:test")
const assert  = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

const { blogsInDb, initialBlogs, nonExistingId, getAuthHeader } = require("./blog_helper.test")



describe("cuando inicialmente hay algunas notas inicializadas", () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})  
  
    const blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  
  })

  test("blogs are returned as json", async () => {
    const user = await getAuthHeader()
    await api
        .get("/api/blogs")
        .expect(200)
        .set("Authorization", `Bearer ${user.token}`)
        .expect("Content-Type", /application\/json/)
  })

  test("there are one blog", async () => {
    const user = await getAuthHeader()
    
    const res = await api
      .get("/api/blogs")    
      .set("Authorization", `Bearer ${user.token}`) 

    assert.strictEqual(res.body.length, initialBlogs.length)
  })

  test("the first blog is about HTTP methods", async () => {
    const user = await getAuthHeader()

    const res = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${user.token}`)

    const contents = res.body.map( e => e.title)
    
    assert(contents.includes("Async/await simplifies making async calls"))
  })

  describe("ver una nota especifica", () => {
    
    test("a valid blog can be added", async () => {
      const user = await getAuthHeader()
      
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
          .set("Authorization", `Bearer ${user.token}`)
          .expect("Content-Type", /application\/json/)
      
      const res = await blogsInDb()
      assert.strictEqual(res.length, initialBlogs.length + 1)
  
      const title = res.map((r) => r.title)
      assert(title.includes("Async/await simplifies making async calls"))
    })

    test('blog without content is not added', async () => {
      const user = await getAuthHeader()
      
      const newBlog = {
        title: "No tiene la estructura necesaria  "
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set("Authorization", `Bearer ${user.token}`)
        .expect(400)
    
      const res = await blogsInDb()
      
      assert.strictEqual(res.length, initialBlogs.length)
    })

    test("Agregar un blog sin authorization", async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = {
          title: '',
          author: 'FullStackOpen',
          url: 'http://prueba.com',
          likes: 200
      }
  
      await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(401)
          .expect("Content-Type", /application\/json/)
          
      const res = await blogsInDb()
      
      assert.strictEqual(res.length, blogsAtStart.length)
    })

    // test("a specific blog can be viewed", async () => {
    //   const user = await getAuthHeader()
    //   const blogsAtStart = await blogsInDb()
    //   const blogToView = blogsAtStart[0]

      
    //   const resultBlog = await api
    //     .get(`/api/blogs/${blogToView.id}`)
    //     .set("Authorization", `Bearer ${user.token}`)
    //     .expect(200)
    //     .expect("Content-Type", /application\/json/)


    //   assert.strictEqual(resultBlog.body, blogToView)
    // })
  })

  describe("eliminando una nota", () => {

    test("a blog can be deleted", async () => {
      const user = await getAuthHeader()
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]
    
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${user.token}`)
        .expect(204)
    
        const res = await blogsInDb()
    
        const title = res.map((r) => r.title)
        assert(!title.includes(blogToDelete.title))
    
        assert.strictEqual(res.length, initialBlogs.length - 1)
    })

  })

  describe("validando propiedads", () => {
    
    test("propiedad id es predeterminada", async () => {
      const res = await blogsInDb()
    
      assert(!res.some(blog => "_id" in blog))
      assert(res.every(blog => "id" in blog))
      
    })

    test("chequeando likes", async () => {
      const user = await getAuthHeader()

      const newBlog = {
        title: "Testeando",
        author: "Matias",
        url: "www.prueba.com",
      }
    
      await api
          .post("/api/blogs")
          .send(newBlog)
          .set("Authorization", `Bearer ${user.token}`)
          .expect(201)
          .expect("Content-Type", /application\/json/)
    
      const res = await blogsInDb()  
    
      assert.strictEqual(res[res.length - 1].likes, 0)
    
    })
    
    test("verificando titulo y url", async () => {
      const user = await getAuthHeader()
    
      const newBlog = {
        author: "Matias",
        url: "www.prueba.com",
        likes: 20
      }
    
      const newBlog2 = {
        title: "Testeando",
        author: "Matias",
        likes: 25
      }
    
      await api
          .post("/api/blogs")
          .send(newBlog)
          .set("Authorization", `Bearer ${user.token}`)
          .expect(400)
    
      await api
          .post("/api/blogs")
          .send(newBlog2)
          .set("Authorization", `Bearer ${user.token}`)
          .expect(400)
    
      const res = await blogsInDb()  
    
      assert.strictEqual(res.length, initialBlogs.length)
    
    })

    test("modificando likes", async () => {
      const user = await getAuthHeader()
      const blogAtStart = await blogsInDb()
      const { title, author, url, likes, id } =  blogAtStart[0]
      
      await api
        .put(`/api/blogs/${id}`)
        .send({title, author, url, likes: 9})
        .set("Authorization", `Bearer ${user.token}`)
        .expect(202)
        .expect("Content-Type", /application\/json/)
        .catch(err => console.log(err))

      const res = await blogsInDb()
      

       assert(res[0].likes !== likes)


    })

  })
})


after(async () => {
    await mongoose.connection.close()
})