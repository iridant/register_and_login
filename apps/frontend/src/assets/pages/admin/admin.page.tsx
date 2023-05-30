// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import SiteHeader from "../../components/header/header.component";
import Content from "../../components/content/content.component";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <SiteHeader/>

        <Content>
            <p>You can see this if you are an admin.</p>
        </Content>
      </div>
    );
  }
}

export default Admin;