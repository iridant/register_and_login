import React from "react";

import styles from "./navbar.module.css";

import authService from "../../services/auth.service";

class Navbar extends React.Component {
  render() {
    return (
        <nav className={styles.navbar}>
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>
                    {authService.getCurrentUser().user || ""}
                </button>
                <div className={styles.dropdowncontent}>
                    <a href="/account">Account</a>
                    <a href="/profile">Profile</a>
                    <a href="/signout">Sign out</a>
                </div>
            </div>
        </nav>
    )
  }
}

export default Navbar