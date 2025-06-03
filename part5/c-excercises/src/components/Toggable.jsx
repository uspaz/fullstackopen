import PropTypes from "prop-types"
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
                        style={{ marginTop: "10px" }}
                        onClick={toggleVisivility}>
                        cancel
                    </button>
                </>
                :
                <button
                    style={{ padding: "5px" }}
                    onClick={toggleVisivility}>
                    {props.buttonLabel}
                </button>
            }
        </>
    )
}

Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggable