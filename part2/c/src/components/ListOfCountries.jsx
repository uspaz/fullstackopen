import React from 'react'

export const ListOfCountries = ({ filteredCountries }) => {

  console.log(filteredCountries)
  return (
    <ul>
        {filteredCountries.map( (country) => {
            return <li key={country.name.common}>{country.name.common}</li>
        } )}
    </ul>
  )
}
