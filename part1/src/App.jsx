import { Content } from './Components/Content'
import { Header } from './Components/Header'
import { Total } from './Components/Total'

const App = () => {
  const course = "Desarrollo de aplicaciones Half Stack"
  const part1 = "Fundamentos de React"
  const exercises1 = 10
  const part2 = "Utilizar accesorios para pasar datos"
  const exercises2 = 7
  const part3 = "Estado de un componente"
  const exercises3 = 14
  return (
    <>
      <Header course={course} />
      <Content content={{part1, part2, part3, exercises1, exercises2, exercises3}} />
      <Total total={{exercises1, exercises2, exercises3}} />
    </>
  )
}

export default App
