import Note from "./Note"

export const ListOfNotes = ({notes, showAll, toggleImportance}) => {

   const filteredNotes = showAll ? 
    notes.filter((note) => note.important === true)
    :
    notes
  
  return (
    <>
        <ul>
          {filteredNotes.map(note => (
            <Note key={note.id} note={ note } toggleImportance={ toggleImportance } />
          )
          )} 
        </ul>
    </>
  )
}