import {render, screen, cleanup } from "@testing-library/react"
// import renderer from "react-test-renderer"
import PageTitle from "../PageTitle"
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup();
})

test("should render PageTitle component", () =>{
    render(<PageTitle />);
    var PageTitleElem = screen.getByTestId("ToDo List")
    expect(PageTitleElem).toBeInTheDocument();
});
