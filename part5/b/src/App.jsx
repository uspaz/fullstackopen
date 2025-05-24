import { useEffect, useState, useRef } from 'react'
import { Note } from "./components/Note";
import { NoteForm } from "./components/NoteForm";
import LoginForm from './components/LoginForm';
import "./styles.css"

import noteService from './services/notes'
import loginService from './services/login';
import Toggable from './components/Toggable';


function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  

  useEffect( () => {

    noteService
      .getAll()
      .then( notes => {
        setNotes(notes)
      })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedNoteAppUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
    
  }, [])
  
  function addNote(noteObject){
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
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

 

  const login = async (username, password) => {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user))
    noteService.setToken(user.token)
    setUser(user)
  }

  

  return (
    <>
      {user ? 
          <>
            <h1 style={{color: "green"}}>Notas by {user.name}</h1>
            
              <button onClick={() => setShowAll(!showAll)}>Mostrar importancia</button>

              <Note notes={notes} showAll={showAll} toggleImportance={toggleImportance} />
              <Toggable buttonLabel="create note" ref={noteFormRef}>
                <NoteForm createNote={addNote} /> 
              </Toggable>
      
          </>
        : 
        <>
          <h1 style={{color: "green"}}>Notas</h1>        
          <Toggable buttonLabel="login">
            <LoginForm login={login}/>
          </Toggable>
        </>
      }
     
    </>
  )
}

export default App
