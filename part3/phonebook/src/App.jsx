import { useEffect, useState } from "react";
import { PersonsForm } from "./components/PersonsForm";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";

import personService from './services/persons'
import { Notifications } from "./components/Notifications";

function App() {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [newPerson, setNewPerson] = useState( 
      {name: "", phone: ""}
    );
  const [message, setMessage] = useState({ text: "", type: ""});

  useEffect( () => {

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

    // if(persons.find( (person) => person.name === newPerson.name && person.phone !== newPerson.phone)){
    //   return changeNumber(newPerson.name, newPerson.phone);
    // }

    personService
    .create(newContact)
    .then( (person) => {
      
      setPersons(prev => [...prev, person])
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


  function handleFilter(e){
    const { value } = e.target;
    setSearchValue(value);
  }

  const filteredPersons = searchValue
  ? persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  : persons;

  // function changeNumber (name, newPhone){
  //   const result = window.confirm(`Desea cambiar el número de ${newPerson.name} a ${newPerson.phone}`);
  //   const person = persons.find( (person) => person.name === name);
    
  //   const changedNote = {...person, phone: newPhone};
  //   if(result){
  //     personService
  //     .update(person.id, changedNote)
  //     .then( (res) => {   
  //       setPersons(persons.map( person => person.id !== res.id ? person : res))
  //       setMessage({
  //         text: "Se modifico el número con exito",
  //         type: "changed"
  //       })
  //       setTimeout(() => {
  //         setMessage(null)
  //       }, 2000)
  //     })
  //     .catch( () => {
  //       setMessage({
  //         text: "No se logro modificar el contacto",
  //         type: "error"
  //       })
  //       setTimeout(() => {
  //         setMessage(null)
  //       }, 2000)
  //     })
  //   }
  // } 

  return (
    <>
      <Notifications message={message} />

      <h1>Guía Teléfonica</h1>  
      <PersonsForm addToPerson={addToPerson} handleNewPerson={handleNewPerson} newPerson={newPerson} />

      <h2>Filtro</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Contactos</h2>
      <Persons filteredPersons={filteredPersons} toggleDelete={toggleDelete} />
    </>
  )
}

export default App
