import React from 'react'

export const PersonsForm = ({ addToPerson, handleNewPerson, newPerson}) => {
  return (
    <form onSubmit={addToPerson}>
        <label style={{margin: "0px 20px"}} htmlFor="person">Nombre:</label>
        <input type="text" name="name" id="person" onChange={handleNewPerson} value={newPerson.name}/>

        <br />

        <label style={{margin: "0px 20px"}} htmlFor="phone">Número:</label>
        <input type="text" name="phone" id="phone" onChange={handleNewPerson} value={newPerson.phone}/>

        <button style={{margin: "20px"}}>Agregar contacto</button>
    </form>
  )
}