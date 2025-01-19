import { Content } from './Components/Content'
import { Header } from './Components/Header'
import { Total } from './Components/Total'

const App = () => {
  const course = "Desarrollo de aplicaciones Half Stack"
  const parts = [
      {
        name: "Fundamentos de React",
        exercises: 10 
      },
      {
        name: "Utilizar accesorios para pasar datos",
        exercises: 7 
      },
      {
        name: "Estado de un componente",
        exercises: 14
      }
    ]
  return (
    <>
      <Header course={course} />
      <Content content={parts} />
      <Total total={parts} />
    </>
  )
}

export default App
