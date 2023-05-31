import React from "react";

import styles from "./header.module.css";

import authService from "../../services/auth.service";

import Navbar from "../navbar/navbar.component"

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className={styles.container}>
            <Navbar/>
        </div>
      </header>
    )
  }
}

export default Header