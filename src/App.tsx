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
  scrollButtonStyle: any;
}

export default class App extends React.Component<AppProps, AppState> {
  private readonly tabs: any;

  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: "Text",
      scrollButtonStyle: {
        opacity: 0,
        pointerEvents: "none",
      },
    }
    this.tabs = {
      "Text": <TextTab/>,
      "Image": <ImageTab/>,
      "Video": <VideoTab/>,
      "Table": <TableTab/>,
      "Email": <EmailTab/>,
    }
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let scroll = window.pageYOffset / window.innerHeight;
    if(scroll > 0.25) {
      this.setState({
        scrollButtonStyle: {
          opacity: 1,
          pointerEvents: "all",
        },
      });
    } else {
      this.setState({
        scrollButtonStyle: {
          opacity: 0,
          pointerEvents: "none",
        },
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
        <div className="App">
          <Navbar tabs={Object.keys(this.tabs)} currentTab={this.state.currentTab} changeTab={(tab: string) => {this.setState({currentTab: tab})}}/>
            {this.tabs[this.state.currentTab]}
            <div className={"scroll-button"} style={this.state.scrollButtonStyle} onClick={() => {window.scrollTo(0, 0)}}>
              Scroll to Top
            </div>
        </div>
    );
  }

}
