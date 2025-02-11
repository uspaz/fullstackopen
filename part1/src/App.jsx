// import { Content } from './Components/Content'
// import { Header } from './Components/Header'
// import { Total } from './Components/Total'

import { useState } from "react"
import { Feedback } from "./Components/Feedback"

const App = () => {
  const [good, SetGood] = useState(0)
    const [neutral, SetNeutral] = useState(0)
    const [bad, SetBad] = useState(0)
  // const course = "Desarrollo de aplicaciones Half Stack"
  // const part1 = "Fundamentos de React"
  // const exercises1 = 10
  // const part2 = "Utilizar accesorios para pasar datos"
  // const exercises2 = 7
  // const part3 = "Estado de un componente"
  // const exercises3 = 14
  return (
    <>
      {/* <Header course={course} />
      <Content content={{part1, part2, part3, exercises1, exercises2, exercises3}} />
      <Total total={{exercises1, exercises2, exercises3}} /> */}

      <Feedback props={{good, SetGood, neutral, SetNeutral, bad, SetBad}}/>
    </>
  )
}

export default App
