import { useState } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
        <div style={{display: visible ? "" : "none"}}>
            {props.children}
            <button 
                onClick={toggleVisibility}
                style={{ display: "block"}}>
                cancel
            </button>
        </div>
        <div style={{display: visible ? "none" : ""}}>
            <button 
                onClick={toggleVisibility}>
                {props.buttonLabel}
            </button>
        </div>     
    </>
    
    
    
  )
}

export default Toggable