import React from 'react';
import { Link } from 'react-router-dom';
import './StudentView.css';
import Clock from '../components/Clock';

class StudentView extends React.Component {
  getRandomColor() {
    const colors = ['pink', 'lightblue', 'lime', 'red', 'yellow'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  render() {
    return (
      <div className="Container">
        <div className="TopBar">
          <Clock />
          <div className="TextContainer">
            <h1 className="Title">Welcome, Student 1!</h1>
            <p>You can choose your test from this page.</p>
          </div>
          <Link to=".." className="LogoutButton">
            Logout
          </Link>
        </div>
        <Link to="/start-test" className="TestContainerButton">
          <div className="TestContainer">
            <h2 className="TestContainerTitle" style={{ backgroundColor: this.getRandomColor() }}>
              Math test 2nd grade Autumn
            </h2>
            <div className="TestContainerInfo">
              <p className="InfoText">Teacher: Bill Gates</p>
              <p className="InfoText">20.6 10.15 - 20.6 14.15</p>
            </div>
          </div>
        </Link>

        <Link to="/start-test" className="TestContainerButton">
          <div className="TestContainer">
            <h2 className="TestContainerTitle" style={{ backgroundColor: this.getRandomColor() }}>
              Finnish writing test 2nd grade Winter
            </h2>
            <div className="TestContainerInfo">
              <p className="InfoText">Teacher: Antti Valmari</p>
              <p className="InfoText">Requires password</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default StudentView;
