
// eslint-disable-next-line react/prop-types
export const Anecdotes = ({anecdotes}) => {

    // eslint-disable-next-line react/prop-types
    const {anecdote, selected, setSelected} = anecdotes

    // eslint-disable-next-line react/prop-types
    const number = Math.floor(Math.random() * anecdote.length )
  return (

    <>
        <p>
            {anecdote[selected]}
        </p>

        <button onClick={() => setSelected(number)}> Change anecdote </button>
    </>
  )
}
