import React from 'react'

export const Persons = ({ filteredPersons }) => {
  return (

    <ul>
        {filteredPersons.map(person => (
            <li key={person.id}>{person.name} - {person.phone}</li>
          ))}   
      </ul>
  )
}
