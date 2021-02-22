import React, {FormEvent} from 'react';

interface EmailTabState {
  status: string;
  statusColor: string;
  email: string;
}

interface EmailTabProps {

}

export default class EmailTab extends React.Component<EmailTabProps, EmailTabState> {
  constructor(props: EmailTabProps) {
    super(props);
    this.state = {
      status: "",
      statusColor: "red",
      email: "",
    };
  }

  handleEmailChange(event: FormEvent) {
    this.setState({
      email: (event.target as HTMLInputElement).value,
    });
  }

  render() {
    return (
      <div className="content">
        <form onSubmit={this.checkEmail.bind(this)}>
          <label>Email:<br/>
            <input name="email" type="text" onChange={this.handleEmailChange.bind(this)}/><br/>
          </label>
          <span style={{color: this.state.statusColor}}>{this.state.status}</span>
          <br/>
          <br/>
          <input type="submit" value="Subscribe to Newsletter"/>
        </form>
      </div>
    )
  }

  checkEmail(event: FormEvent) {
    event.preventDefault();
    let email = this.state.email;
    if (email.indexOf("@") !== -1 && (email.endsWith(".com") || email.endsWith(".edu"))) {
      this.setState({
        status: "Email successfully recorded.",
        statusColor: "green",
      });
    } else {
      this.setState({
        status: "Invalid email address.",
        statusColor: "red",
      });
    }
  }
}
