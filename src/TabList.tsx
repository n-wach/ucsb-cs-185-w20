import React from 'react';
import TextTab from "./tabs/TextTab";
import ImageTab from "./tabs/ImageTab";
import VideoTab from "./tabs/VideoTab";
import TableTab from "./tabs/TableTab";
import EmailTab from "./tabs/EmailTab";
import ZoomTab from "./tabs/ZoomTab";

interface TabListProps {
  setActiveTab(tab: string): void;
  showModal(content: any): void;
}

interface TabListState {
  activeTabName: string;
}

export default class TabList extends React.Component<TabListProps, TabListState> {
  private tabs: any;
  constructor(props: TabListProps) {
    super(props);
    this.state = {
      activeTabName: "Text",
    };
    this.tabs = {
      "Text": <TextTab/>,
      "Image": <ImageTab showModal={this.props.showModal}/>,
      "Video": <VideoTab showModal={this.props.showModal}/>,
      "Table": <TableTab/>,
      "Email": <EmailTab/>,
      "Zoom": <ZoomTab/>,
    }
    this.changeTab("Text");
  }
  render() {
    return (
      <div className="nav">
        {
          Object.keys(this.tabs).map((tabName: string) =>
          <a key={tabName} className={"nav-item" + (tabName == this.state.activeTabName ? " active" : "")} onClick={this.changeTab.bind(this, tabName)}>
            <span>{tabName}</span>
          </a>)
        }
      </div>
    );
  }
  changeTab(name: string) {
    this.setState({
      activeTabName: name,
    });
    this.props.setActiveTab(this.tabs[name]);
  }
}
