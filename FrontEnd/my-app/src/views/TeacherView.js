import React, { useState, useEffect } from 'react';
import './TeacherView.css';
import { useNavigate } from 'react-router-dom';
import GradeChart from '../components/GradeChart';
import Header from '../components/Header'; // Import the Header component

function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [Name, setName] = useState('');
  const [isNameLoaded, setIsNameLoaded] = useState(false); // New state variable
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = parseInt(localStorage.getItem('jwtTokenExpiration'), 10);
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const loggedInTeacherName = localStorage.getItem('userName');
    if (loggedInTeacherName) {
      setName(loggedInTeacherName);
      setIsNameLoaded(true); // Set the flag to true once the teacher name is loaded
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
      setName(loggedInTeacherName);
    }
  }, []);
  
  const Links = [
    { label: "Evaluate tests" },
    { label: "ExamineTests", path: "/examine-tests" },
    { label: "Students", path: "/students" },
    { label: "Create a Test", path: "/create-tests"}
  ];

    return (
      <div className="teacher-view">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          Name={Name} 
          isNameLoaded={isNameLoaded}
          links={Links} 
        />
        <section className="content">
          <div className="alert">Some of the tests are not yet evaluated!</div>
          <h2>Student Grades Distribution</h2>
        </section>
        <GradeChart />
      </div>
    );
  }

  export default TeacherView;
