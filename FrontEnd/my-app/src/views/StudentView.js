import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentView.css';
import Clock from '../components/Clock';
import { BiLogOut } from 'react-icons/bi';
import tests from '../jsonFiles/tests.json'; // Import the tests JSON file

function StudentView() {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const loggedInStudentName = localStorage.getItem('loggedInStudentName');
    if (loggedInStudentName) {
      setStudentName(loggedInStudentName);
    }
  }, []);

  const getRandomColor = () => {
    const colors = ['pink', 'lightblue', 'lime', 'red', 'yellow'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="StudentView-Container">
      <div className="StudentView-TopBar">
        <Clock />
        <div className="TextContainer">
          <h1 className="Title">Welcome {studentName}!</h1>
          <p>You can choose your test from this page.</p>
        </div>
        <Link to='..' className='Student-LogOutButton'><BiLogOut></BiLogOut></Link>
      </div>
      <div className='TestOptions'>
        {tests.map(test => ( // Map over the array of tests
          <Link to={`/start-test/${test.id}`} className="TestContainerButton" key={test.id}>
            <div className="TestContainer">
              <h2 className="TestContainerTitle" style={{ backgroundColor: getRandomColor() }}>
                {test.name}
              </h2>
              <div className="TestContainerInfo">
                <p className="InfoText">Teacher: {test.teacher}</p>
                <p className="InfoText">{test.requiresPassword ? 'Requires password' : ''}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentView;
