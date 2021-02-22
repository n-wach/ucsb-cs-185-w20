import React from 'react';

export default class TextTab extends React.Component {
  render() {
    return (
      <div className="content">
        <form>
          <label>First Name:<br/>
            <input name="first-name" type="text"/><br/>
          </label>
          <br/>
          <label>Last Name:<br/>
            <input name="last-name" type="text"/><br/>
          </label>
          <br/>
          <label>Favorite Movie:<br/>
            <input name="movie" type="radio" value="avengers"/>Avengers<br/>
            <input name="movie" type="radio" value="dark-knight"/>Dark Knight<br/>
            <input name="movie" type="radio" value="tenet"/>Tenet<br/>
          </label>
          <br/>
          <input type="submit" value="Done"/>
        </form>
      </div>
    )
  }
}
