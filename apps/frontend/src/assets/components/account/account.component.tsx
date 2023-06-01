import React from "react";

import styles from "./account.module.css";

import authService from "../../services/auth.service";

interface State{
  userId: string;
  user: string;
  roles: Array<string>;
  joinDate: number;
}

class Account extends React.Component<{}, State> {
    constructor(props: any){
      super(props);

      this.state = {
        userId: "",
        user: "",
        roles: [],
        joinDate: 0
      }
    }

    componentDidMount(): void {
      this.setState(authService.getCurrentUser())
    }

    render() {
      return (
        <>
          <p>Username: {this.state.user}</p>
          <p>User ID: {this.state.userId}</p>
          <p>Join Date: {new Date(this.state.joinDate).toString()}</p>
          <p>Roles: {this.state.roles.join(", ")}</p>
        </>
      )
    }
  }
  
  export default Account