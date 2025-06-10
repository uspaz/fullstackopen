import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Toggable from "./Toggable"
import { beforeEach, expect } from "vitest"

describe('<Toggable />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Toggable buttonLabel="show..." >
                <div className="testDiv">
                    toggable content
                </div>
            </Toggable>
        ).container
    })

    test("renders its children", async() => {
        await screen.findAllByText("toggable content")
    })

    test("at start the children are not displayed", () => {
        const div = container.querySelector(".toggableContent")
        expect(div).toHaveStyle("display: none")
    })

    test("after clicking the button, children are desplayed", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("show...")
        await user.click(button)
    
        const div = container.querySelector(".toggableContent")
        expect(div).not.toHaveStyle("display: none")
    })

    test("toggled content can be closed", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("show...")
        await user.click(button)

        const closeButton = screen.getByText("cancel")
        await user.click(closeButton)
    
        const div = container.querySelector(".toggableContent")
        expect(div).toHaveStyle("display: none")
    })

})