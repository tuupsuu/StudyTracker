import React, { useState, useEffect } from 'react';
import './TeacherView.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import GradeChart from '../components/GradeChart';

function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [isTeacherNameLoaded, setIsTeacherNameLoaded] = useState(false); // New state variable
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = parseInt(localStorage.getItem('jwtTokenExpiration'), 10);
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const loggedInTeacherName = localStorage.getItem('userName');
    if (loggedInTeacherName) {
      setTeacherName(loggedInTeacherName);
      setIsTeacherNameLoaded(true); // Set the flag to true once the teacher name is loaded
    }
  }, []);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.clear();
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
        localStorage.clear();
      }
    });

    // remember to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem('isRefreshing')) {
          localStorage.clear();
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
            {isTeacherNameLoaded && <h1 className='TitleTeacher'>Welcome, {teacherName}!</h1>}
          </div>
          <Link to='..' className='LogoutButtonTeacher' onClick={() => {
            localStorage.clear();
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
