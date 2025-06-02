import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NoteForm } from "./NoteForm"

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
    const createNote = vi.fn()
    const user = userEvent.setup()


    render(<NoteForm createNote={createNote} />)

    const input = screen.getByRole("textbox")
    const sendButton = screen.getByText("Agregar nota")

    await user.type(input, "testing a form...")
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    console.log(createNote.mock.calls);
    
    expect(createNote.mock.calls[0][0].content).toBe("testing a form...")
})