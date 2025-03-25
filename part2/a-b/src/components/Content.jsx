
import { Part } from "./Part";
export const Content = ({parts}) => {
  const total = parts.reduce( (sum, acum) => sum + acum.exercises, 0)

  return (
    <>
      {parts.map( (content) => {
        return <Part key={content.id} text={content.name} exercises={content.exercises} />

      })}
      total de ejercicios: {total}
    </>
  )
}


