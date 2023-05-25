// import { render, screen, waitFor } from "@testing-library/react";
import { render, screen, cleanup } from "@testing-library/react";
import Logout from '../Logout';
// import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
})

// jest.mock("@auth0/auth0-react");

// test('It redirects the user to the Auth0 Universal Login page when the Log In button is pressed', async () => {
//     beforeEach(() => {
//         useAuth0.mockReturnValue({
//             isAuthenticated: false,
//             loginWithRedirect: jest.fn(),
//         });
//       });

//     render(<Login/>);
//     const loginElement = screen.getByTestId("login")
//     expect(loginElement).toBeInTheDocument();

//     // loginElement.click();

//     // // Expect that if we click the "Log In" button, the loginWithRedirect function gets called
//     // await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
//   });


test("should render Logout component", () => {
    render(<Logout/>);
    const logoutElement = screen.getByTestId("logoutComp");
    expect(logoutElement).toBeInTheDocument();
});


