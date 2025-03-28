import React from 'react'

export const NoteForm = ({addNote, handleNewNote, newNote}) => {
  return (
    <form onSubmit={addNote}>
        <label style={{margin: "0px 20px"}} htmlFor="person">Contenido:</label>
        <input type="text" name="name" id="person" onChange={handleNewNote} value={newNote.content}/>

        <button style={{margin: "20px"}}>Agregar contacto</button>
    </form>
  )
}
