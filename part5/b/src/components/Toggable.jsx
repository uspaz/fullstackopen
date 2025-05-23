import { useState } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
        { visible ?
            <>
                {props.childen}
                <button onClick={toggleVisibility}>cancel</button>
            </>
        :
            <>
            </>
        
        }
    </>
    
    
  )
}

export default Toggable