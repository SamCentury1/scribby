
import './App.css';

import React, { Component } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

// components
import SignInPage from './pages/Auth/SignInPage/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage/SignUpPage';
import Logout from './functions/Logout';

import HomePage from './pages/Home/HomePage/HomePage';

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <div>
                <Routes>
                  <Route path="/signin" element={<SignInPage/>} />
                  <Route path="/signup" element={<SignUpPage/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/home/:userId" element={<HomePage/>} />
                </Routes>
              </div>
            </BrowserRouter>
        )
    }
}

export default App

