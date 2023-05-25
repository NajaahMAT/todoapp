import {render, screen, cleanup } from "@testing-library/react"
// import renderer from "react-test-renderer"
import Button from "../Button"
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup();
})

test("should render CheckButton component", () =>{
    render(<Button variant="primary" />);

    var buttonElem = screen.getByTestId("button")
    expect(buttonElem).toBeInTheDocument();
});
