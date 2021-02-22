import React from 'react';

export default class TableTab extends React.Component {
  render() {
    return (
      <div className="content">
        <table className="projects-table">
          <thead>
          <th>Name</th>
          <th>Link</th>
          <th>Description</th>
          </thead>
          <tbody>
          <tr>
            <td>Protractr</td>
            <td><a href="https://n-wach.github.io/protractr/">n-wach.github.io/protractr</a></td>
            <td>A geometric constraint solver for creating LaTeX diagrams.</td>
          </tr>
          <tr>
            <td>Class Alerts</td>
            <td><a href="https://classalerts.org/">classalerts.org</a></td>
            <td>A website to help college students get into their classes by monitoring waitlists.</td>
          </tr>
          <tr>
            <td>Blabbur</td>
            <td><a href="http://www.blabbur.com/">blabbur.com</a></td>
            <td>A social media network consisting almost entirely of bots powered by OpenAI's GPT-3.</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
