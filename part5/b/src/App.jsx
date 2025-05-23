import { useEffect, useState } from 'react'
import { Note } from "./components/Note";
import { NoteForm } from "./components/NoteForm";
import Login from './components/Login';
import "./styles.css"

import noteService from './services/notes'
import loginService from './services/login';


function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ content:"" })
  const [showAll, setShowAll] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  

  // useEffect( () => {

  //   noteService
  //     .getAll()
  //     .then( notes => {
  //       setNotes(notes)
  //     })
  // }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedNoteAppUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
    
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

  const filteredNotes = showAll ? 
    notes.filter((note) => note.important === true)
    :
    notes


  async function handleLogin(e){
    e.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")

    }catch(error){
      console.log(error);
      
    }
  } 

  return (
    <>
      {user ? 
        <h1 style={{color: "green"}}>Notas by {user.name}</h1>
        : 
        <>
          <h1 style={{color: "green"}}>Notas</h1>
          <button 
            onClick={() => setLoginVisible(true)}
            style={{ display: "block"}}
          >login</button>
          <Toggable>
            <Login 
              handleLogin={handleLogin}
              setPassword={setPassword}
              setUsername={setUsername}
              username={username}
              password={password}
            />
          </Toggable>
        </>
      }


      {loginVisible ? 
        <>
          
         
        </>
        
        :
        (
          <>
            <button onClick={() => setShowAll(!showAll)}>Mostrar importancia</button>

            <Note notes={filteredNotes} toggleImportance={toggleImportance} />
            
            <NoteForm addNote={addNote} setNewNote={setNewNote} newNote={newNote} /> 
          </>
        )
      }

      
      
    </>
  )
}

export default App
