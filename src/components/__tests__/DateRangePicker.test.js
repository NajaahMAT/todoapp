import {render, screen, cleanup } from "@testing-library/react"
// import renderer from "react-test-renderer"
import DateRangePicker from "../DateRangePicker"
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup();
})

test("should render DateRangePicker component", () =>{
    render(<DateRangePicker/>);

    var dateElem = screen.getByTestId("dateRangePicker")
    expect(dateElem).toBeInTheDocument();
    // expect(checkElem).toHaveTextContent("Sign In")
    // expect(PageTitleElem).toHaveTextContent("Sign Out")
});
