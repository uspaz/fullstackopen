const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    id: "680a1e41df99318d13fa8b07",
    title:"Ella tiene un capricho que es enorme",
    author: "YSY A",
    url: "https://www.youtube.com/watch?v=-1C4IPmnB70&ab_channel=YSYA-Topic",
    likes: 86
  },
  {
    id: "680d916f4c0958fb7f82488d",
    title:"Los juegos del hambre",
    author: "Suzanne Collins",
    url: "https://en.wikipedia.org/wiki/Suzanne_Collins",
    likes: 23
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}