import React from 'react'

export const Filter = ({handleFilter}) => {
  return (

    <input type="text" placeholder="Buscar contacto" onChange={handleFilter}/>
  )
}
