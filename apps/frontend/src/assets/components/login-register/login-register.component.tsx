import React from "react";
import { Navigate } from "react-router-dom";

import styles from "./login-register.module.css";

import authService from "../../services/auth.service";

const StateEnum = {
  Login: 0,
  Register: 1
}

interface Props {}

interface State {
  mode: Number;
  username: String;
  password: String;
  passwordVerify: String;
  isLoggedIn: any;
}

class LoginRegister extends React.Component<Props, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      mode: StateEnum.Login,
      username: "",
      password: "",
      passwordVerify: "",
      isLoggedIn: false
    }

    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
  }

  componentDidMount(): void {
    this.setState({isLoggedIn: authService.getCurrentUser().userId})
  }

  switchMode = (button: Object) =>{
    this.setState({mode: this.state.mode == StateEnum.Login ? StateEnum.Register : StateEnum.Login})
  }

  doLogin(){
    //AuthService.login("bob", "Allkjdlkjk!5") Leaving this in for debug purposes..
    authService.signIn(this.state.username, this.state.password).then((response) => {
      this.setState({isLoggedIn: authService.getCurrentUser().userId})
      alert(response.message);
    });
  }

  doRegister(){
    if(this.state.password != this.state.passwordVerify){
      alert("Passwords don't match!");
    }else{
      authService.signUp(this.state.username, this.state.password).then((response) => {
        alert(response.message);
      });
    }
  }

  onUsernameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      username: e.currentTarget.value
    });
  }

  onPasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.currentTarget.value
    });
  }

  onPasswordVerifyChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      passwordVerify: e.currentTarget.value
    });
  }

  render() {
    const {mode, isLoggedIn} = this.state;

    if(isLoggedIn){
      return <Navigate to="/"/>;
    }
  
    return (
      <div className={styles.logincontainer}>
        <h2>{mode ? "Register" : "Login"}</h2>
        <hr/>
          <input className={styles.text_input} onChange={this.onUsernameChange} name="username" placeholder="Username" type="text"></input><br/>
          <input className={styles.text_input} onChange={this.onPasswordChange} name="password" placeholder="Password" type="password"></input><br/>
          {mode == StateEnum.Register ? <><input className={styles.text_input} onChange={this.onPasswordVerifyChange} name="password_validate" placeholder="Verify Password" type="password"></input><br/></> : null}
          <button onClick={mode ? this.doRegister : this.doLogin} className={styles.button}>Submit</button>
        <hr/>
        <button className={styles.button} onClick={this.switchMode}>{mode ? "Switch to Login" : "Switch to Register"}</button>
      </div>
    )
  }
}

export default LoginRegister