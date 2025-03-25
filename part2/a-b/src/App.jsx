// import { Course } from "./components/Course"

import { useEffect, useState } from "react";
import axios from 'axios'
import { PersonsForm } from "./components/PersonsForm";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";
// import { Note } from "./components/Note"

function App() {
const [persons, setPersons] = useState([]);
const [searchValue, setSearchValue] = useState("");
// const [newPerson, setNewPerson] = useState( 
//     {name: "", phone: ""}
//   );

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

  // function addToPerson(e){
  //   e.preventDefault();

  //   const newContact = {
  //     name: newPerson.name,
  //     phone: newPerson.phone,
  //     id: persons.length + 1,
  //   }

  //   if(persons.find( (person) => person.name === newPerson)){
  //     alert("El nombre ya existe")
  //     return setPersons(persons)
  //   }

  //   setPersons(persons.concat(newContact))
  //   setNewPerson({name: "", phone: ""})

  // }
  
  // function handleNewPerson(e){
  //   const { name, value } = e.target;
  //   console.log(e.target, name, value);
    
  //   setNewPerson({
  //     ...newPerson,
  //     [name]: value
  //   })
    
  // }

  // function handleFilter(e){
  //   const { value } = e.target;
  //   setSearchValue(value);
  // }

  useEffect( () => {
    axios
      .get('http://localhost:3001/phonebook')
      .then((res) => {
        setPersons(res.data)
      })
  }, [])

  const filteredPersons = searchValue
  ? persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  : persons;



  return (
    <>
      <h1>Guía Teléfonica</h1>  
      {/* <PersonsForm addToPerson={addToPerson} handleNewPerson={handleNewPerson} newPerson={newPerson} /> */}

      <h2>Filtro de contactos</h2>
      {/* <Filter handleFilter={handleFilter} /> */}
      
      <h2>Contactos</h2>
      <Persons filteredPersons={filteredPersons} />
      
      
      {/* {courses.map( (course) => { 
        return <Course key={course.id} course={course} />
      })} */}
      
    </>
  )
}

export default App
