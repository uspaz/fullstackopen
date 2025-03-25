// import { Content } from './Components/Content'
// import { Header } from './Components/Header'
// import { Total } from './Components/Total'

import { Anecdotes } from "./Components/Anecdotes";

import { useState } from "react"
// import { Feedback } from "./Components/Feedback"

const App = () => {
  //   const [good, SetGood] = useState(0)
  //   const [neutral, SetNeutral] = useState(0)
  //   const [bad, SetBad] = useState(0)


  // const course = "Desarrollo de aplicaciones Half Stack"
  // const part1 = "Fundamentos de React"
  // const exercises1 = 10
  // const part2 = "Utilizar accesorios para pasar datos"
  // const exercises2 = 7
  // const part3 = "Estado de un componente"
  // const exercises3 = 14

    const anecdote = [
      'Si duele, hazlo más a menudo', 
      'Añadir mano de obra a un proyecto de software tardío lo hace más tardío',
      'El primer 90 por ciento del código supone el primer 10 por ciento del tiempo de desarrollo... El 10 por ciento restante del código supone el otro 90 por ciento del tiempo de desarrollo',
      'Cualquier tonto puede escribir código que un ordenador pueda entender.', 
      'Los buenos programadores escriben código que los humanos pueden entender', 
      'La optimización prematura es la raíz de todos los males', 
      'Depurar es el doble de difícil que escribir el código en primer lugar. Por lo tanto, si escribes el código de la forma más inteligente posible, no eres, por definición, lo suficientemente inteligente como para depurarlo',
      'Programar sin un uso extremadamente intensivo de console.log es lo mismo que si un médico se negara a usar rayos X o análisis de sangre cuando diagnostica a sus pacientes',
      'La única forma de ir rápido, es ir bien.'
    ];
    const [selected, setSelected] = useState(null)
   
  return (
    <>
      {/* <Header course={course} />
      <Content content={{part1, part2, part3, exercises1, exercises2, exercises3}} />
      <Total total={{exercises1, exercises2, exercises3}} /> */}

      {/* <Feedback props={{good, SetGood, neutral, SetNeutral, bad, SetBad}}/> */}

      <Anecdotes anecdotes={{anecdote, selected, setSelected}} />
    </>
  )
}

export default App
