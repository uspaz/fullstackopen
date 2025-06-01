import { useState } from 'react';

export const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState({ content:"" })

  function addNote(e){
    e.preventDefault();
    createNote({
      content: newNote.content,
      important: Math.random() > 0.5,
    })
    setNewNote({content: ""})
  }

  return (
    <form onSubmit={addNote}>
        <label 
          style={{margin: "0px 10px"}} 
          htmlFor="note">Nota:
        </label>

        <input 
          style={{padding: "2px 0px"}} 
          type="text" 
          name="note" 
          id="note" 
          onChange={({target}) => setNewNote({content: target.value, important: Math.random() > 0.5})} value={newNote.content}
        />

        <button style={{margin: "10px"}}>Agregar nota</button>
    </form>
  )
}
