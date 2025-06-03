import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { expect } from "vitest"

describe("render <Blog />", () => {

    test("visualización del titulo y su autor", () => {
        const blog = {
            title: "Comprobando visualización",
            author: "mati",
            url: "http://www.prueba.com",
            likes: 21
        }

        render(<Blog blog={blog}/>)

        const title = screen.getByText("Comprobando visualización")
        const autor = screen.getByText("mati", {exact: false})
        const likes = screen.queryByTestId("likes")

        expect(title).toBeDefined()
        expect(autor).toBeDefined()
        expect(likes).toBeNull()

    })

    test("visualización de la url y los likes", async () => {
        const blog = {
            title: "Comprobando visualización",
            author: "mati",
            url: "http://www.prueba.com",
            likes: 21,
            user: "681c92589cbaa52e2b9def71"
        }
             
        const userId = "681c92589cbaa52e2b9def71"

        render(<Blog blog={blog} user={userId}/>)
        
        const user = userEvent.setup()
        const button = screen.getByText("view")
        await user.click(button)

        const url = screen.getByText("http://www.prueba.com")
        const likes = screen.getByTestId("likes")

        expect(url).toBeDefined()
        expect(likes).toHaveTextContent(21)
    })

    test("dando likes", async () => {
        const blog = {
            title: "Comprobando visualización",
            author: "mati",
            url: "http://www.prueba.com",
            likes: 21,
            user: "681c92589cbaa52e2b9def71"
        }
             
        const userId = "681c92589cbaa52e2b9def71"
        const addLikes = vi.fn()

        render(<Blog blog={blog} addLikes={addLikes} user={userId}/>)

        const user = userEvent.setup()
        const button = screen.getByText("view")
        await user.click(button)

        const likesButton = screen.getByTestId("button-likes")
        await user.click(likesButton)
        await user.click(likesButton)

        expect(addLikes.mock.calls).toHaveLength(2)
    })
})