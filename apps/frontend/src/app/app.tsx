// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import styles from './app.module.css';

import LoginRegister from '../assets/components/login-register/login-register.component'

import Home from "../assets/pages/home/home.page"
import Admin from "../assets/pages/admin/admin.page"

import { Route, Routes } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path="/login" element={<LoginRegister/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;