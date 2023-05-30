import React from "react";

import styles from "./content.module.css";

type Props = {
  children: React.ReactNode
}

class Content extends React.Component<Props> {
  constructor(props: {children: React.ReactNode}){
    super(props)
  }

  render() {
    const {children} = this.props;

    return (
      <div className={styles.container}>
        {children}
      </div>
    )
  }
}

export default Content