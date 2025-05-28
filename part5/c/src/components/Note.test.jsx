/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
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
