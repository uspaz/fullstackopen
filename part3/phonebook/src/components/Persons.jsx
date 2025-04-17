import React from 'react'

export const Persons = ({ filteredPersons, toggleDelete }) => {
  return (

    <ul>
        {filteredPersons.map(person => (
            <li key={person.id}>
              {person.name} - {person.phone}
              <span> </span>
              <button onClick={() => toggleDelete(person.id)}>eliminar</button>
            </li>
          ))}   
      </ul>
  )
}