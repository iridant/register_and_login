import React from "react";

import styles from "./login-register.module.css";

const StateEnum = {
  Login: 0,
  Register: 1
}

type Props = {}

type State = {
  mode: Number
}

class LoginRegister extends React.Component<Props, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      mode: StateEnum.Login
    }
  }

  switchMode = (button: Object) =>{
    this.setState({mode: this.state.mode == StateEnum.Login ? StateEnum.Register : StateEnum.Login})
  }

  doLogin(){
    console.log("Do Login")
  }

  doRegister(){
    console.log("Do Register")
  }

  render() {
    const {mode} = this.state;

    return (
      <div className={styles.logincontainer}>
        <h2>{mode ? "Register" : "Login"}</h2>
        <hr/>
          <input className={styles.text_input} placeholder="Username" type="text"></input><br/>
          <input className={styles.text_input} placeholder="Password" type="password"></input><br/>
          <button onClick={mode ? this.doRegister : this.doLogin} className={styles.button}>Submit</button>
        <hr/>
        <button className={styles.button} onClick={this.switchMode}>{mode ? "Switch to Login" : "Switch to Register"}</button>
      </div>
    )
  }
}

export default LoginRegister