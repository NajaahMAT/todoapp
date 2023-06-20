import React, {useState} from 'react';
import { Link , Navigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';



function Navbar() {
   const [redirect, setRedirect] = useState(false);

   const cookies = new Cookies();

//    const is_loggedin = cookies.get('is_loggedin')
//    console.log('is_loggedin: ', is_loggedin);

   const logout = async () => {
    // await fetch('http://localhost:8080/signout',{
    //     method: 'POST',
    //     headers:{
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': 'Bearer ' + token
    //     },
    //     credentials: 'include',
    // })

    // const content = await response.json()
    // console.log(content)
    cookies.set("is_loggedin", false)
    cookies.set("token", "")
    cookies.set("user_id", "")

    setRedirect(true)
  }

  if (redirect){
    return <Navigate to="/signin"/>
  }

  let menu;

  const token = cookies.get('token')
  const user_id = cookies.get('user_id')

  console.log('token: ' + JSON.stringify(token));
  console.log('user_id: ' + JSON.stringify(user_id));

  if (token === '') {
      menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item active">
                  <Link to="/signin" className="nav-link">Login</Link>
              </li>
              <li className="nav-item active">
                  <Link to="/register" className="nav-link">Register</Link>
              </li>
          </ul>
      )
  } else {
      menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item active">
                  <Link to="/signin" className="nav-link" onClick={logout}>Logout</Link>
              </li>
          </ul>
      )
  }

   return (
        <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
            <div className='container-fluid'>
                <Link to="/" className='navbar-brand'>
                    Home
                </Link>
                <div>
                    {menu}
                    {/* {!is_loggedin ? (
                        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                            <li className="nav-item active">
                                <Link to="/signin" className='nav-link'>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/register" className='nav-link'>
                                    Register
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                            <li className="nav-item active">
                                <Link to="/signout" className='nav-link'>
                                    Logout
                                </Link>
                                <li><button type='button' onClick={logout}>Logout</button></li>
                            </li>
                            <li className="nav-item active">
                                <Link to="/register" className='nav-link'>
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )} */}
                </div>
            </div>
        </nav>
    )
}


export default Navbar
