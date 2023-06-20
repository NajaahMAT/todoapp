import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <>
      <div className = "App" data-testid = "app">
      <BrowserRouter>
          <Navbar />
          <main>
              <Routes>
                 <Route path="*" element={<SignIn/>} />
                 <Route path="/" element={<Home/>} />
                 <Route path="signin" element={<SignIn/>} />
                 <Route path="register" element={<Register/>} />
                 <Route path="tasks" element={<TaskManager/>} />
                 {/* <Route path="signout" element={<Home/>} /> */}
              </Routes>
          </main>
       </BrowserRouter>
       <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: '1.4rem',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
