import { Header } from './Header'
import { Content } from './Content'

export const Course = ({course}) => {


  return (

    <>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
    </>
  )
}
