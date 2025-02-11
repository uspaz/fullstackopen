/* eslint-disable react/prop-types */

export const Total = ({total}) => {

  return (
    <>
      <p>Número de ejercicios {total.exercises1 + total.exercises2 + total.exercises3}</p>
    </>
  )
}
