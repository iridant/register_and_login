import React from "react";

import styles from "./header.module.css";

class Header extends React.Component {
  render() {
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
              <a href="/">Home</a>
              <a href="/admin">Admin</a>
            </nav> 
        </div>
    )
  }
}

export default Header