import React from "react";

import styles from "./account.module.css";

import authService from "../../services/auth.service";

interface State{
}

class Userlist extends React.Component<{}, State> {
    constructor(props: any){
      super(props);
    }

    componentDidMount(): void {
      
    }

    render() {
      return (
        <>
        </>
      )
    }
  }
  
  export default Userlist