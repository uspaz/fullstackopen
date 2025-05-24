export const Note = ({notes, showAll, toggleImportance}) => {

   const filteredNotes = showAll ? 
    notes.filter((note) => note.important === true)
    :
    notes
  
  return (
    <>
        <ul>
        {filteredNotes.map(note => (
            <li key={note.id}>
              {note.content}
              <button style={{margin: "3px 10px"}} onClick={() => toggleImportance(note.id)}> {note.important ? "importante" : "no es importante"} </button>  
            </li>

          ))}   
      </ul>
    </>
  )
}