import React from 'react';

interface NavbarProps {
  tabs: string[];
  currentTab: string;
  changeTab(tab: string): void;
}

export default class Navbar extends React.Component<NavbarProps> {
  render() {
    return (
      <div className="nav">
        {
          this.props.tabs.map((tabName: string) =>
          <a className={"nav-item" + (tabName == this.props.currentTab ? " active" : "")} onClick={this.changeTab.bind(this, tabName)}>
            <span>{tabName}</span>
          </a>)
        }
      </div>
    );
  }
  changeTab(name: string) {
    this.props.changeTab(name);
  }
}
