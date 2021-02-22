import React from "react";

interface BodyProps {
  tabs: any;
  activeTab: string;
}

export default class Body extends React.Component<BodyProps> {
  render() {
    return this.props.tabs[this.props.activeTab]
  }
}