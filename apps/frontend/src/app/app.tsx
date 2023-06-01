// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import styles from './app.module.css';

import LoginRegister from '../assets/components/login-register/login-register.component'

import Home from "../assets/pages/home/home.page"
import Admin from "../assets/pages/admin/admin.page"
import AccountPage from '../assets/pages/account/account.page';

import { Route, Routes } from 'react-router';

import PrivateRoute from "../assets/components/privateroute/privateroute.component"
import authService from '../assets/services/auth.service';

class App extends React.Component{
  componentDidMount(){
    authService.verifyLogin();
  }

  render() {
    return (
      <div className={styles.main}>
        <Routes>
            <Route path='/' element={<PrivateRoute minimumRole="user"><Home/></PrivateRoute>}/>
            <Route path='/account' element={<PrivateRoute minimumRole="user"><AccountPage/></PrivateRoute>}/>
            <Route path='/admin' element={<PrivateRoute minimumRole="admin"><Admin/></PrivateRoute>}/>
            <Route path="/login" element={<LoginRegister/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;