
const Note = ({ note, toggleImportance}) => {
  return (
    <li className="note">
        {note.content}
        <button style={{margin: "3px 10px"}} onClick={() => toggleImportance(note.id)}> {note.important ? "importante" : "no es importante"} </button>  
    </li>
  )
}

export default Note