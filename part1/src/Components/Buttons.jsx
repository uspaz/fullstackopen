// eslint-disable-next-line react/prop-types
export const Buttons = ({type, func, name}) => {
  return (
       
    <button onClick={ () => func(type + 1)}>{name}</button>

  )
}
