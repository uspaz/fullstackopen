import React from 'react'

export const NoteForm = ({addNote, handleNewNote, newNote}) => {
  return (
    <form onSubmit={addNote}>
        <label style={{margin: "0px 10px"}} htmlFor="person">Nota: </label>
        <input style={{padding: "2px 0px"}} type="text" name="name" id="person" onChange={handleNewNote} value={newNote.content}/>

        <button style={{margin: "10px"}}>Agregar nota</button>
    </form>
  )
}
