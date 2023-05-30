// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import SiteHeader from "../../components/header/header.component";
import Content from "../../components/content/content.component";

class Home extends React.Component {
  render() {
    return (
      <div>
        <SiteHeader/>

        <Content>
            <p>Anyone can see this.</p>
        </Content>
      </div>
    );
  }
}

export default Home;