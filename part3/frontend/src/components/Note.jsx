import React from 'react'

export const Note = ({notes, toggleImportance}) => {
  
  return (
    <>
        <ul>
        {notes.map(note => (
            <li key={note.id}>
              {note.content}
              <button style={{margin: "3px 10px"}} onClick={() => toggleImportance(note.id)}> {note.important ? "importante" : "no es importante"} </button>  
            </li>

          ))}   
      </ul>
    </>
  )
}