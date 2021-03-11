import React from "react";

interface BodyProps {
  activeTab: any;
}

export default class Body extends React.Component<BodyProps> {
  render() {
    return this.props.activeTab
  }
}
