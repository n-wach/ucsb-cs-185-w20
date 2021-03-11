import React, {FormEvent} from 'react';

interface ZoomTabState {
  meetings: any[];
  showMeetings: boolean;
  newTitle: string,
  titleStatus: string,
  newDate: string,
  dateStatus: string,
  newLink: string,
  linkStatus: string,
  newImportant: boolean,
}

interface ZoomTabProps {

}

interface Meeting {
  title: string;
  textInfor: string;
  day: string;
  important: boolean;
}

interface MeetingProps {
  meeting: Meeting;
  deleteSelf(): void;
  updateMeeting(meeting: any): void;
}

interface MeetingState {
  showEdit: boolean;
  newTitle: string,
  titleStatus: string,
  newDate: string,
  dateStatus: string,
  newLink: string,
  linkStatus: string,
  newImportant: boolean,
}

class Meeting extends React.Component<MeetingProps, MeetingState> {
  constructor(props: MeetingProps) {
    super(props);
    this.state = {
      showEdit: false,
      newTitle: this.props.meeting.title,
      titleStatus: "",
      newDate: this.props.meeting.day,
      dateStatus: "",
      newLink: this.props.meeting.textInfor,
      linkStatus: "",
      newImportant: this.props.meeting.important,
    };
  }

  checkTitle() {
    let title = this.state.newTitle;
    if(title.length == 0) {
      this.setState({
        titleStatus: "Can't be empty",
      });
      return false;
    } else if (title.length > 30) {
      this.setState({
        titleStatus: "Title can't be longer than 30 chars",
      });
      return false;
    }
    this.setState({
      titleStatus: "",
    });
    return true;
  }

  handleTitleChange(event: FormEvent) {
    this.setState({
      newTitle: (event.target as HTMLInputElement).value,
    });
  }

  checkDate() {
    let date = this.state.newDate;
    if (date == "") {
      this.setState({
        dateStatus: "Can't be empty",
      });
      return false;
    }
    this.setState({
      dateStatus: "",
    });
    return true;
  }

  handleDateChange(event: FormEvent) {
    this.setState({
      newDate: (event.target as HTMLInputElement).value,
    });
  }

  checkLink() {
    let link = this.state.newLink;
    if(!link.includes("zoom")) {
      this.setState({
        linkStatus: "Link must contain 'zoom'",
      });
      return false;
    }
    this.setState({
      linkStatus: "",
    });
    return true;
  }

  handleLinkChange(event: FormEvent) {
    this.setState({
      newLink: (event.target as HTMLInputElement).value,
    });
  }

  handleImportantChange(event: FormEvent) {
    this.setState({
      newImportant: (event.target as HTMLInputElement).checked,
    });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.checkTitle();
    this.checkDate();
    this.checkLink();

    if(!this.checkTitle() || !this.checkDate() || !this.checkLink()) {
      return;
    }

    let meeting = {
      title: this.state.newTitle,
      day: this.state.newDate,
      textInfor: this.state.newLink,
      important: this.state.newImportant,
    }

    this.props.updateMeeting(meeting);
    this.setState({showEdit: false});
  }

  render() {
    return <div className={"meeting" + (this.props.meeting.important ? " important" : "")} onDoubleClick={() => {this.setState({showEdit: !this.state.showEdit})}}>
      <h2>{this.props.meeting.title}</h2>
      <p>Date: {this.props.meeting.day}</p>
      <a href={this.props.meeting.textInfor}>{this.props.meeting.textInfor}</a>
      <p>Important? {this.props.meeting.important ? "Yes" : "No"}</p>
      <button onClick={() => this.props.deleteSelf.bind(this)()}>Delete</button>
      {this.state.showEdit &&
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Title<br/>
              <input type="text" onChange={this.handleTitleChange.bind(this)} value={this.state.newTitle}/><br/>
          </label>
          <span style={{color: "red", visibility: this.state.titleStatus == "" ? "hidden" : "visible"}} >{this.state.titleStatus}</span>
          <br/>

          <label>Date<br/>
              <input type="date" onChange={this.handleDateChange.bind(this)} value={new Date(this.state.newDate ? this.state.newDate : new Date()).toISOString().substr(0, 10)}/><br/>
          </label>
          <span style={{color: "red", visibility: this.state.dateStatus == "" ? "hidden" : "visible"}}>{this.state.dateStatus}</span>
          <br/>

          <label>Zoom Link<br/>
              <input type="url" onChange={this.handleLinkChange.bind(this)} value={this.state.newLink}/><br/>
          </label>
          <span style={{color: "red", visibility: this.state.linkStatus == "" ? "hidden" : "visible"}}>{this.state.linkStatus}</span>
          <br/>

          <label>Important<br/>
              <input type="checkbox" onChange={this.handleImportantChange.bind(this)} checked={this.state.newImportant}/><br/>
          </label>
          <br/>
          <br/>
          <input type="submit" value="Update Meeting"/>
      </form>
      }
    </div>;
  }
}

export default class ZoomTab extends React.Component<ZoomTabProps, ZoomTabState> {
  static TASKS_ENDPOINT = "http://localhost:5000/tasks";

  constructor(props: ZoomTabProps) {
    super(props);
    this.state = {
      meetings: [],
      showMeetings: true,
      newTitle: "",
      titleStatus: "",
      newDate: "",
      dateStatus: "",
      newLink: "",
      linkStatus: "",
      newImportant: false,
    }
  }

  updateMeetings() {
    this.getMeetings().then((meetings) => {
      this.setState({meetings: meetings});
    });
  }

  componentDidMount() {
    this.updateMeetings();
  }

  async getMeetings() {
    let response = await fetch(ZoomTab.TASKS_ENDPOINT);
    return response.json();
  }

  async updateMeeting(id: number, new_meeting: any) {
    await fetch(ZoomTab.TASKS_ENDPOINT + "/" + id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(new_meeting),
    });
    this.updateMeetings();
  }

  async addMeeting(meeting: any) {
    await fetch(ZoomTab.TASKS_ENDPOINT, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    this.updateMeetings();
  }

  async deleteMeeting(id: number) {
    this.setState({
      meetings: this.state.meetings.filter((meeting) => meeting.id == id)
    })
    await fetch(ZoomTab.TASKS_ENDPOINT + "/" + id, {
      method: "DELETE",
    });
    this.updateMeetings();
  }

  checkTitle() {
    let title = this.state.newTitle;
    if(title.length == 0) {
      this.setState({
        titleStatus: "Can't be empty",
      });
      return false;
    } else if (title.length > 30) {
      this.setState({
        titleStatus: "Title can't be longer than 30 chars",
      });
      return false;
    }
    this.setState({
      titleStatus: "",
    });
    return true;
  }

  handleTitleChange(event: FormEvent) {
    this.setState({
      newTitle: (event.target as HTMLInputElement).value,
    });
  }

  checkDate() {
    let date = this.state.newDate;
    if (date == "") {
      this.setState({
        dateStatus: "Can't be empty",
      });
      return false;
    }
    this.setState({
      dateStatus: "",
    });
    return true;
  }

  handleDateChange(event: FormEvent) {
    this.setState({
      newDate: (event.target as HTMLInputElement).value,
    });
  }

  checkLink() {
    let link = this.state.newLink;
    if(!link.includes("zoom")) {
      this.setState({
        linkStatus: "Link must contain 'zoom'",
      });
      return false;
    }
    this.setState({
      linkStatus: "",
    });
    return true;
  }

  handleLinkChange(event: FormEvent) {
    this.setState({
      newLink: (event.target as HTMLInputElement).value,
    });
  }

  handleImportantChange(event: FormEvent) {
    this.setState({
      newImportant: (event.target as HTMLInputElement).checked,
    });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.checkTitle();
    this.checkDate();
    this.checkLink();

    if(!this.checkTitle() || !this.checkDate() || !this.checkLink()) {
      return;
    }

    let meeting = {
      title: this.state.newTitle,
      day: this.state.newDate,
      textInfor: this.state.newLink,
      important: this.state.newImportant,
    }

    this.addMeeting(meeting);
    this.setState({showMeetings: true});
  }

  render() {
    return (
      <div className="content">
        <h1>Zoom Meeting Manager</h1>
        <button onClick={() => this.setState({showMeetings: !this.state.showMeetings})}>{this.state.showMeetings ? "Create Meeting" : "Full Schedule"}</button>
        {this.state.showMeetings ?
          (this.state.meetings.length == 0 ? <p>No available meetings</p> :
            this.state.meetings.map((meeting) => <Meeting key={meeting.id} meeting={meeting} deleteSelf={() => this.deleteMeeting(meeting.id)}
                                                         updateMeeting={(new_meeting) => {this.updateMeeting(meeting.id, new_meeting)}
          }/>)) :
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Title<br/>
              <input type="text" onChange={this.handleTitleChange.bind(this)}/><br/>
            </label>
            <span style={{color: "red", visibility: this.state.titleStatus == "" ? "hidden" : "visible"}}>{this.state.titleStatus}</span>
            <br/>

            <label>Date<br/>
              <input type="date" onChange={this.handleDateChange.bind(this)}/><br/>
            </label>
            <span style={{color: "red", visibility: this.state.dateStatus == "" ? "hidden" : "visible"}}>{this.state.dateStatus}</span>
            <br/>

            <label>Zoom Link<br/>
              <input type="url" onChange={this.handleLinkChange.bind(this)}/><br/>
            </label>
            <span style={{color: "red", visibility: this.state.linkStatus == "" ? "hidden" : "visible"}}>{this.state.linkStatus}</span>
            <br/>

            <label>Important<br/>
              <input type="checkbox" onChange={this.handleImportantChange.bind(this)}/><br/>
            </label>
            <br/>
            <br/>
            <input type="submit" value="Add Meeting"/>
          </form>
        }
      </div>
    )
  }
}
