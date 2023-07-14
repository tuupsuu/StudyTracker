import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentView.css';
import Clock from '../components/Clock';
import { BiLogOut } from 'react-icons/bi';
import tests from '../jsonFiles/tests.json'; 

function StudentView() {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenExpiration');
      localStorage.removeItem('userRights');
      localStorage.removeItem('loggedInStudentName');
      navigate("..");
    } else {
      const loggedInStudentName = localStorage.getItem('loggedInStudentName');
      if (loggedInStudentName) {
        setStudentName(loggedInStudentName);
      }
    }
  }, [navigate]);

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
        <Link to='..' className='Student-LogOutButton' onClick={() => {
          localStorage.removeItem('jwtTokenExpiration');
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('loggedInStudentName');
        }}><BiLogOut></BiLogOut></Link>      </div>
      <div className='TestOptions'>
        {tests.map(test => (
          <Link 
            to={`/start-test`} 
            className="TestContainerButton" 
            key={test.id}
            onClick={() => localStorage.setItem('currentTest', test.name)}
          >
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
