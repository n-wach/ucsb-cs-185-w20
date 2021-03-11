import React, {FormEvent} from 'react';

interface ZoomTabState {
  meetings: any[];
  showMeetings: boolean;
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
  deleteSelf(id: number): void;
}

class Meeting extends React.Component<MeetingProps> {
  constructor(props: MeetingProps) {
    super(props);
  }
  render() {
    return <div className={"meeting"}>
      <h2>{this.props.meeting.title}</h2>
      <p>Date: {this.props.meeting.day}</p>
      <a href={this.props.meeting.textInfor}>{this.props.meeting.textInfor}</a>
      <p>Important? {this.props.meeting.important ? "Yes" : "No"}</p>
      <button>Delete</button>
    </div>;
  }
}

export default class ZoomTab extends React.Component<ZoomTabProps, ZoomTabState> {
  static TASKS_ENDPOINT = "http://localhost:5000/tasks/";

  constructor(props: ZoomTabProps) {
    super(props);
    this.state = {
      meetings: [],
      showMeetings: true,
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

  async putMeeting(meeting: any) {
    await fetch(ZoomTab.TASKS_ENDPOINT , {
      method: "POST",
      body: JSON.stringify(meeting),
    });
  }

  async deleteMeeting(id: number) {
    await fetch(ZoomTab.TASKS_ENDPOINT + id, {
      method: "DELETE",
    });
  }

  render() {
    return (
      <div className="content">
        <h1>Zoom Meeting Manager</h1>
        <button onClick={() => this.setState({showMeetings: !this.state.showMeetings})}>Create Meeting</button>
        {this.state.showMeetings ?
          (this.state.meetings.map((meeting) => <Meeting key={meeting.id} meeting={meeting} deleteSelf={() => this.deleteMeeting(meeting.id)}/>))
              : <form>

          </form>
        }
      </div>
    )
  }
}
