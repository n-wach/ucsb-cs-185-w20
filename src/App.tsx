import React from 'react';
import Navbar from "./Navbar";
import TextTab from "./tabs/TextTab";
import ImageTab from "./tabs/ImageTab";
import VideoTab from "./tabs/VideoTab";
import TableTab from "./tabs/TableTab";
import EmailTab from "./tabs/EmailTab";

interface AppProps {
}

interface AppState {
  currentTab: string;
}

export default class App extends React.Component<AppProps, AppState> {
  private readonly tabs: any;

  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: "Text",
    }
    this.tabs = {
      "Text": <TextTab/>,
      "Image": <ImageTab/>,
      "Video": <VideoTab/>,
      "Table": <TableTab/>,
      "Email": <EmailTab/>,
    }
  }
  render() {
    return (
        <div className="App">
          <Navbar tabs={Object.keys(this.tabs)} currentTab={this.state.currentTab} changeTab={(tab: string) => {this.setState({currentTab: tab})}}/>
            {this.tabs[this.state.currentTab]}
        </div>
    );
  }
}
