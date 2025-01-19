/* eslint-disable react/prop-types */

export const Total = ({total}) => {
  return (
    <>
      <p>Número de ejercicios {total[0].exercises + total[1].exercises + total[2].exercises}</p>
    </>
  )
}
