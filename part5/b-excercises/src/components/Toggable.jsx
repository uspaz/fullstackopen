import { useState } from "react"

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisivility = () => {
        setVisible(!visible)
    }
  return (
    <>
        { visible ?
            <>
                {props.children}
                <button 
                    style={{marginTop: "10px"}}
                    onClick={toggleVisivility}>
                    cancel
                </button>
            </>
        :    
            <button 
                style={{padding: "5px"}}
                onClick={toggleVisivility}>
                {props.buttonLabel}
            </button>
        }
        
    </>
  )
}

export default Toggable