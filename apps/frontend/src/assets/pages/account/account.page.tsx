// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import SiteHeader from "../../components/header/header.component";
import Content from "../../components/content/content.component";

import Account from "../../components/account/account.component";

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <SiteHeader/>

        <Content>
            <Account/>
        </Content>
      </div>
    );
  }
}

export default AccountPage;