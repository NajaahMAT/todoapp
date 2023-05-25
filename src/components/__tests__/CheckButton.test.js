import {render, screen, cleanup } from "@testing-library/react"
// import renderer from "react-test-renderer"
import CheckButton from "../CheckButton"
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup();
})

test("should render CheckButton component", () =>{
    render(<CheckButton checked="true" handleCheck="" />);

    var checkElem = screen.getByTestId("checkButton")
    expect(checkElem).toBeInTheDocument();
    // expect(checkElem).toHaveTextContent("Sign In")
    // expect(PageTitleElem).toHaveTextContent("Sign Out")
});
