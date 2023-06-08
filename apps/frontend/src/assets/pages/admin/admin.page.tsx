// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import SiteHeader from "../../components/header/header.component";
import Content from "../../components/content/content.component";
import Userlist from '../../components/userlist/userlist.component';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <SiteHeader/>

        <Content>
            <p>You can see this page if you are an admin.</p>

            <Userlist/>
        </Content>
      </div>
    );
  }
}

export default Admin;