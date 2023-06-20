import React from 'react';
import { Link } from 'react-router-dom';
import './StudentView.css';
import Clock from '../components/Clock';

class StudentView extends React.Component {
  // state and methods

  render() {
    return (
      <div className='Container'>
        <div className='TopBar'>
          <Clock />
          <div className='TextContainer'>
            <h1 className='Title'>Welcome, Student 1!</h1>
            <p>You can choose your test from this page.</p>
          </div>
          <Link to='..' className='LogoutButton'>
            Logout
          </Link>
        </div>
        <Link to='./StartTest' className='ContentContainerButton'>
          <div className='ContentContainer'>
            <h2 className='ContentContainerTitle'>Math test 2nd grade Autumn</h2>
            <div className='ContentContainerInfo'>
              <p className='InfoText'>Teacher: Bill Gates</p>
              <p className='InfoText'>Not completed</p>
              <p className='InfoText'>20.6 10.15 - 20.6 14.15</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default StudentView;
