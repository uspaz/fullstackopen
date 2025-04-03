// import { Course } from "./components/Course"

import { useEffect, useState } from "react";
import { PersonsForm } from "./components/PersonsForm";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";
import { Note } from "./components/Note";
import { NoteForm } from "./components/NoteForm";


// import noteService from './services/notes'
import personService from './services/persons'
import { Notification } from "./components/Notification";

function App() {
  // const [notes, setNotes] = useState([])
const [persons, setPersons] = useState([]);
const [searchValue, setSearchValue] = useState("");
const [newPerson, setNewPerson] = useState( 
    {name: "", phone: ""}
  );
const [message, setMessage] = useState({ text: "", type: ""});

// const [newNote, setNewNote] = useState({content:""})

  // const courses = [
  //   {
  //     name: 'Half Stack application development',
  //     id: 1,
  //     parts: [
  //       {
  //         name: 'Fundamentals of React',
  //         exercises: 10,
  //         id: 1
  //       },
  //       {
  //         name: 'Using props to pass data',
  //         exercises: 7,
  //         id: 2
  //       },
  //       {
  //         name: 'State of a component',
  //         exercises: 14,
  //         id: 3
  //       },
  //       {
  //         name: 'Redux',
  //         exercises: 11,
  //         id: 4
  //       }
  //     ]
  //   }, 
  //   {
  //     name: 'Node.js',
  //     id: 2,
  //     parts: [
  //       {
  //         name: 'Routing',
  //         exercises: 3,
  //         id: 1
  //       },
  //       {
  //         name: 'Middlewares',
  //         exercises: 7,
  //         id: 2
  //       }
  //     ]
  //   }
  // ]

  useEffect( () => {
    // axios
    // .get('http://localhost:3001/phonebook')
    // .then((res) => {
    //   setPersons(res.data)
    // })

    personService
    .getAll()
    .then( (persons) =>{
      setPersons(persons)
      
    })
    .catch( () => {
      setMessage({
        text: "No se pudo cargar la lista de contactos",
        type: "error"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  
}, [])


  function addToPerson(e){
    e.preventDefault();

    const newContact = {
      name: newPerson.name,
      phone: newPerson.phone,
    }

    if(persons.find( (person) => person.name === newPerson.name && person.phone !== newPerson.phone)){
      return changeNumber(newPerson.name, newPerson.phone);
    }

    personService
    .create(newContact)
    .then( (person) => {
      setPersons(persons.concat(person))
      setMessage({
        text: "La persona fue agregada con exito",
        type: "success"
      })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      setNewPerson({name: "", phone: ""})
    })
    .catch( () => {
      setMessage({
        text: "No se pudo agregar el contacto",
        type: "error"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
      

  }
  
  function handleNewPerson(e){
    const { name, value } = e.target;
    
    setNewPerson({
      ...newPerson,
      [name]: value
    })
    
  }

  function toggleDelete(id){
    const person = persons.find( (person) => person.id === id);
    
    const result = window.confirm(`Desea eliminar a ${person.name}`);
    if(result){
      personService 
      .deletePerson(id)
      .then( (res) => {        
        setPersons(persons.filter( (person) => person.id !== res.id))
        setMessage({
          text: "Se elimino el contacto con exito",
          type: "success"
        })
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch( () => {
        setMessage({
          text: "No se logro eliminar el contacto",
          type: "error"
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }


  function handleFilter(e){
    const { value } = e.target;
    setSearchValue(value);
  }

  const filteredPersons = searchValue
  ? persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  : persons;

  function changeNumber (name, newPhone){
    const result = window.confirm(`Desea cambiar el número de ${newPerson.name} a ${newPerson.phone}`);
    const person = persons.find( (person) => person.name === name);
    
    const changedNote = {...person, phone: newPhone};
    if(result){
      personService
      .update(person.id, changedNote)
      .then( (res) => {   
        setPersons(persons.map( person => person.id !== res.id ? person : res))
        setMessage({
          text: "Se modifico el número con exito",
          type: "changed"
        })
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch( () => {
        setMessage({
          text: "No se logro modificar el contacto",
          type: "error"
        })
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
    }
  } 

    // useEffect( () => {
  //   // Metodo 1
  //   // axios
  //   //   .get('http://localhost:3001/notes')
  //   //   .then((res) => {
        
  //   //     setNotes(res.data)
  //   //   })

  //   // Metodo 2
  //   noteService
  //     .getAll()
  //     .then( notes => {
  //       setNotes(notes)
  //     })
  // }, [])

  // function addNote(e){
  //   e.preventDefault();
  //   const noteObject = {
  //     content: newNote.content,
  //     important: Math.random() > 0.5,
  //   }
  // // Metodo 1
  //   // axios
  //   //   .post("http://localhost:3001/notes", noteObject)
  //   //   .then( (res) => {
  //   //     setNotes(notes.concat(res.data))
  //   //     setNewNote({content:""})
  //   //   })

  // // Metodo 2
  //   noteService
  //     .create(noteObject)
  //     .then(newNote => {
  //       setNotes(notes.concat(newNote))
  //       setNewNote('')
  //     })
  // }

  // function handleNewNote(e) {
  //   const { value } = e.target;
  //   setNewNote({
  //     content: value,
  //     important: Math.random() > 0.5,
  //   })
  // }

  // const filteredNotes = searchValue
  // ? notes.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  // : notes;

  // function toggleImportance(id){
  //   // const url = `http://localhost:3001/notes/${id}`;
  //   const note = notes.find( (note) => note.id === id );
  //   const changedNote = {...note, important: !note.important};

  //   // Metodo 1
  //   // axios.put(url, changeNote).then( (res) => {
  //   //     setNotes( notes.map( (note) => note.id !== id ? note : res.data))
  //   //   })

  //   // Metodo 2
  //   noteService
  //   .update(id, changedNote)
  //   .then( returnedNote => {
  //     setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  //   })
  // } 


  return (
    <>

      <Notification message={message} />

      <h1>Guía Teléfonica</h1>  
      <PersonsForm addToPerson={addToPerson} handleNewPerson={handleNewPerson} newPerson={newPerson} />

      <h2>Filtro</h2>
      <Filter handleFilter={handleFilter} />
      
      <h2>Contactos</h2>
      <Persons filteredPersons={filteredPersons} toggleDelete={toggleDelete} />


      {/* <h1>Nuevas notas</h1> */}
      {/* <NoteForm addNote={addNote} handleNewNote={handleNewNote} newNote={newNote} /> */}
      
      {/* <h2>Notas</h2> */}
      {/* <Note notes={filteredNotes} toggleImportance={toggleImportance} /> */}
      
      {/* {courses.map( (course) => { 
        return <Course key={course.id} course={course} />
      })} */}
      
    </>
  )
}

export default App
