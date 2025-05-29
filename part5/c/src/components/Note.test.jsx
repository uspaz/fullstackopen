/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('render content', () => {
    const note = {
        content: 'Las pruebas de componentes se realizan con react-testing-library',
        important: true
    }

    render(<Note note={note} />)

    const element = screen.getByText('Las pruebas de componentes se realizan con react-testing-library')
    expect(element).toBeDefined()
})

test('render content', () => {
    const note = {
        content: 'Las pruebas de componentes se realizan con react-testing-library',
        important: true
    }

    const { container } = render(<Note note={note} />)

    const div = container.querySelector(".note")
    expect(div).toHaveTextContent("Las pruebas de componentes se realizan con react-testing-library")
})

test('render content', () => {
    const note = {
        content: 'Las pruebas de componentes se realizan con react-testing-library',
        important: true
    }

    render(<Note note={note} />)

    const element = screen.getByText('importante')

    screen.debug(element)

     expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Las pruebas de componentes se realizan con react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} toggleImportance={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText("importante")
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})