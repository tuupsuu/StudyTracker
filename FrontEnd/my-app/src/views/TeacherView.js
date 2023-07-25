import React, { useState, useEffect } from 'react';
import './TeacherView.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import GradeChart from '../components/GradeChart';

function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [teacherName, setTeacherName] = useState('');
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const loggedInTeacherName = localStorage.getItem('userName');
    if (loggedInTeacherName) {
      setTeacherName(loggedInTeacherName);
    }
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTokenExpiration");
        localStorage.removeItem("userRights");
        localStorage.removeItem("loggedInOfficialName");
        localStorage.removeItem("userName");
        navigate("..");
      }
    }, 1000); // checks every second

    // Set sessionStorage item on page load
    sessionStorage.setItem('isRefreshing', 'true');

    // Adding event listener for window/tab close
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      // If page is being refreshed, sessionStorage item 'isRefreshing' will exist
      if (!sessionStorage.getItem('isRefreshing')) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTokenExpiration");
        localStorage.removeItem("userRights");
        localStorage.removeItem("loggedInOfficialName");
        localStorage.removeItem("userName");
      }
    });

    // remember to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem('isRefreshing')) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtTokenExpiration");
          localStorage.removeItem("userRights");
          localStorage.removeItem("loggedInOfficialName");
          localStorage.removeItem("userName");
        }
      });
    };
  }, [navigate]);

  useEffect(() => {
    const loggedInTeacherName = localStorage.getItem('userName');
    if (loggedInTeacherName) {
      setTeacherName(loggedInTeacherName);
    }
  }, []);
  

    return (
      <div className="teacher-view">
        <header className="header">
          <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />
          <div className='HeaderTeacher'>
            <h1 className='TitleTeacher'>Welcome, {teacherName}!</h1>
          </div>
          <Link to='..' className='LogoutButtonTeacher' onClick={() => {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtTokenExpiration");
            localStorage.removeItem("userRights");
            localStorage.removeItem("loggedInOfficialName");
            localStorage.removeItem("userName");
          }}> <BiLogOut></BiLogOut>
          </Link>
        </header>

        {isSidebarOpen && (
          <aside className="sidebar">
            <FaBars className="close-button" onClick={() => setSidebarOpen(false)}>Close</FaBars>
            <ul>
              <li>Create a test</li>
              <li>Evaluate tests</li>
              <Link to='/examine-tests'>ExamineTests</Link>
              <li><Link to='/students'>Students</Link></li>
            </ul>
          </aside>
        )}

        <section className="content">
          <div className="alert">Some of the tests are not yet evaluated!</div>
          <h2>Student Grades Distribution</h2>
          <GradeChart />
        </section>
      </div>
    );
  }

  export default TeacherView;
