import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
        <div style={{display: visible ? "" : "none"}} className='toggableContent'>
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
})

export default Toggable