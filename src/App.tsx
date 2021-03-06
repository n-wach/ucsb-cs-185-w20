import React from 'react';
import TabList from "./TabList";
import TextTab from "./tabs/TextTab";
import ImageTab from "./tabs/ImageTab";
import VideoTab from "./tabs/VideoTab";
import TableTab from "./tabs/TableTab";
import EmailTab from "./tabs/EmailTab";
import Body from './Body';

interface AppProps {
}

interface AppState {
  activeTab: any;
  scrollButtonStyle: any;
  showModal: boolean;
  modalContent: any;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      activeTab: null,
      scrollButtonStyle: {
        opacity: 0,
        pointerEvents: "none",
      },
      showModal: false,
      modalContent: null,
    }

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

  showModal(content: any) {
    this.setState({
      showModal: true,
      modalContent: content,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="App">
        <TabList showModal={this.showModal} setActiveTab={(tab: any) => {this.setState({activeTab: tab})}}/>

        <Body activeTab={this.state.activeTab}/>

        {/* These components are required for functionality, but the PDF didn't say where to put them... So I'm just adding here. */}
        <div className={"scroll-button"} style={this.state.scrollButtonStyle} onClick={() => {window.scrollTo(0, 0)}}>
          Scroll to Top
        </div>
        {
          this.state.showModal &&
          <div className={"modal-back"} onClick={this.hideModal}>
            <div className={"modal"}>
              {this.state.modalContent}
            </div>
          </div>
        }
      </div>
    );
  }
}
