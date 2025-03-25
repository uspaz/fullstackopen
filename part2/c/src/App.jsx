import axios from "axios";
import { useState, useEffect } from "react";
import { Note } from "./components/Note";

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect( () => {
    console.log("effect");
    
    axios
      .get('http://localhost:3001/notes')
      .then( (res) => {
        console.log('promesa finalizada');
        setNotes(res.data)
      })
  }, [])
  console.log('render', notes.length, 'notes');
  
  return (
    <>
    </>
  )
}

export default App
