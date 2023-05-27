import React from "react";

import styles from "./login-register.module.css";

const ContainerState = {
  Login: 0,
  Register: 1
}

class LoginRegister extends React.Component {
  state = {
    mode: ContainerState.Login
  }

  constructor(props: {}) {
    super(props);
  }

  render() {
    const {mode} = this.state;
    var modetext = mode ? "Register" : "Log in"

    return (
      <div className={styles.logincontainer}>
          <>
            <h2>{modetext}</h2>
            <hr/>
              <input className={styles.text_input} placeholder="Username" type="text"></input><br/>
              <input className={styles.text_input} placeholder="Password" type="password"></input><br/>
              <button>{modetext}</button>
            <hr/>
            <button>{mode ? "Switch to Log in" : "Switch to Register"}</button>
          </> 
      </div>
    )
  }
}

export default LoginRegister