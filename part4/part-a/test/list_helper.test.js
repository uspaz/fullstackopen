const { test, describe } = require("node:test")
const assert = require("node:assert")


const listHelper = require("../utils/list_helper")
const totalLikes = require("../utils/list_helper").totalLikes
const favoriteBlog = require("../utils/list_helper").favoriteBlog
const mostBlogs = require("../utils/list_helper").mostBlogs

test("dummy returs one", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe("total likes", () => {
    
    test("la lista vacia es cero", () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test("cuando tenga solo un blog iguala a los de ese", () => {
        const blog = [
            {
                title: "Ella tiene un capricho que es enorme",
                author: "Ysy A",
                url: "https://www.youtube.com/watch?v=-1C4IPmnB70&ab_channel=YSYA-Topic",
                likes: 86,
            }
        ]

        assert.strictEqual(totalLikes(blog), 86)
    })

    test("de una lista mayor se calcula bien", () => {
        const blogs = [
            {
                title: "Ella tiene un capricho que es enorme",
                author: "Ysy A",
                url: "https://www.youtube.com/watch?v=-1C4IPmnB70&ab_channel=YSYA-Topic",
                likes: 86,
            },
            {
                title: "Ella tiene un capricho que es enorme",
                author: "Ysy A",
                url: "https://www.youtube.com/watch?v=-1C4IPmnB70&ab_channel=YSYA-Topic",
                likes: 10,
            },
            {
                title: "Ella tiene un capricho que es enorme",
                author: "Ysy A",
                url: "https://www.youtube.com/watch?v=-1C4IPmnB70&ab_channel=YSYA-Topic",
                likes: 49,
            }
        ]
        assert.strictEqual(totalLikes(blogs), 145)
    })
} )

describe("favorite blog", () => {

    test("la lista vacia es cero", () => {
        assert.strictEqual(favoriteBlog([]), 0)
    })

    test("titulo con más likes", () => {
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422aa71b54a676234d17f8",
              title: "Go To Statement Considered Harmful",
              author: "Edsger W. Dijkstra",
              url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
              likes: 5,
              __v: 0
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            },
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
              likes: 10,
              __v: 0
            },
            {
              _id: "5a422ba71b54a676234d17fb",
              title: "TDD harms architecture",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
              likes: 0,
              __v: 0
            },
            {
              _id: "5a422bc61b54a676234d17fc",
              title: "Type wars",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
              likes: 2,
              __v: 0
            }  
          ]

        assert.deepStrictEqual(favoriteBlog(blogs), {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },)
    })
})

describe("more blogs", () => {

    test("la lista vacias es cero", () => {
        assert.strictEqual(mostBlogs([]), 0)
    })

    test("cuando se pasa solo un autor", () => {
        const blog = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
          ]
        assert.deepStrictEqual(mostBlogs(blog), {author: "Michael Chan", blogs: 1})
    })

    test("autor con más blogs", () => {
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422aa71b54a676234d17f8",
              title: "Go To Statement Considered Harmful",
              author: "Edsger W. Dijkstra",
              url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
              likes: 5,
              __v: 0
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            },
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
              likes: 10,
              __v: 0
            },
            {
              _id: "5a422ba71b54a676234d17fb",
              title: "TDD harms architecture",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
              likes: 0,
              __v: 0
            },
            {
              _id: "5a422bc61b54a676234d17fc",
              title: "Type wars",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
              likes: 2,
              __v: 0
            }  
          ]
        assert.deepStrictEqual(mostBlogs(blogs), {author: "Robert C. Martin", blogs: 3})
    })
}) 