import { useEffect, useState } from 'react'
import { Note } from "./components/Note";
import { NoteForm } from "./components/NoteForm";
import "./styles.css"

import noteService from './services/notes'


function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ content:"" })

  useEffect( () => {

    noteService
      .getAll()
      .then( notes => {
        setNotes(notes)
      })
  }, [])

  function addNote(e){
    e.preventDefault();
    const noteObject = {
      content: newNote.content,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  function handleNewNote(e) {
    const { value } = e.target;
    setNewNote({
      content: value,
      important: Math.random() > 0.5,
    })
  }

  function toggleImportance(id){
    const note = notes.find( (note) => note.id === id );
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then( returnedNote => {
        if(!returnedNote) return;

        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
  }

  return (
    <>
      <h1 style={{color: "green"}}>Notas</h1>

      <button>Mostrar importancia</button>

      <Note notes={notes} toggleImportance={toggleImportance} />
      
      <NoteForm addNote={addNote} handleNewNote={handleNewNote} newNote={newNote} /> 
      
    </>
  )
}

export default App
