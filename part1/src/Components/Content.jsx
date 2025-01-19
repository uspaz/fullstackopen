
/* eslint-disable react/prop-types */
import { Part } from "./Part";
export const Content = ({content}) => {
  return (
    <>
      <Part part={content.part1} exercises={content.exercises1} />
      <Part part={content.part2} exercises={content.exercises2} />
      <Part part={content.part3} exercises={content.exercises3} />
    </>
  )
}


