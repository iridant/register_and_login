import React from "react";

import styles from "./navbar.module.css";

import authService from "../../services/auth.service";

class Navbar extends React.Component {
  render() {
    const currentUser = authService.getCurrentUser();

    return (
        <nav className={styles.navbar}>
            <a href="/">Home</a>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>
                    {currentUser && currentUser.user || ""}
                </button>
                <div className={styles.dropdowncontent}>
                    {authService.isAdmin() && <a href="/admin">Admin</a>}
                    <a href="/account">Account</a>
                    <a href="/profile">Profile</a>
                    <a href="/signout">Sign-out</a>
                </div>
            </div>
        </nav>
    )
  }
}

export default Navbar