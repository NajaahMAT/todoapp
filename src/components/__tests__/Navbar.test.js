import {render, screen, cleanup } from "@testing-library/react"
// import renderer from "react-test-renderer"
import Navbar from "../Navbar"
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup();
})

test("should render PageTitle component", () =>{
    render(<Navbar />);
    var PageTitleElem = screen.getByTestId("Navbar")
    expect(PageTitleElem).toBeInTheDocument();
    expect(PageTitleElem).toHaveTextContent("Sign In")
    // expect(PageTitleElem).toHaveTextContent("Sign Out")
});
