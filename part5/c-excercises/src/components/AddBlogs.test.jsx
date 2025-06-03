import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddBlogs from "./AddBlogs"

test("<AddBlogs />", async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<AddBlogs createBlog={createBlog}/>)

    const titleInput = screen.getByPlaceholderText("title...")
    const authorInput = screen.getByPlaceholderText("author...")
    const urlInput = screen.getByPlaceholderText("url...")
    const sendButton = screen.getByText("Crear")


    await user.type(titleInput, "Creando nuevos blogs")
    await user.type(authorInput, "fisura")
    await user.type(urlInput, "http://www.fisura.com")
    await user.click(sendButton)

    const validacion = createBlog.mock.calls[0][0]

    expect(validacion.title).toBe("Creando nuevos blogs")
    expect(validacion.author).toBe("fisura")
    expect(validacion.url).toBe("http://www.fisura.com")
})