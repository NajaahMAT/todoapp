// import { render, screen, waitFor } from "@testing-library/react";
import { render, screen, cleanup } from "@testing-library/react";
import Login from '../Login';
// import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
})

// jest.mock("@auth0/auth0-react");

// // mock user info
// const auth0User = {
//   name: 'najaah9@gmail.com',
//   email: 'najaah9@gmail.com',
// };


// test('It redirects the user to the Auth0 Universal Login page when the Log In button is pressed', async () => {
//     beforeEach(() => {
//         useAuth0.mockReturnValue({
//             isAuthenticated: false,
//             loginWithRedirect: jest.fn(),
//             user: auth0User,
//         });
//       });

//     render(<Login/>);
//     const loginElement = screen.getByTestId("login")
//     expect(loginElement).toBeInTheDocument();

//     // loginElement.click();

//     // // Expect that if we click the "Log In" button, the loginWithRedirect function gets called
//     // await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
//   });


 test("should render Login component", () =>{
    render(<Login/>);
    const loginElement = screen.getByTestId("login")
    expect(loginElement).toBeInTheDocument();
});
