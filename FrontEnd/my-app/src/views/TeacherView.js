import React, { useState, useEffect } from 'react';
import './TeacherView.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import GradeChart from '../components/GradeChart';
import accounts from '../jsonFiles/accounts.json'; 

function TeacherView() {  
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [teacherName, setTeacherName] = useState(''); 

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtTokenExpiration');
        localStorage.removeItem('userRights');
        localStorage.removeItem('loggedInStudentName');
        navigate("..");
      }
    }, 1000); // checks every second
  
    const loggedInStudentName = localStorage.getItem('loggedInStudentName');
    if (loggedInStudentName) {
      setStudentName(loggedInStudentName);
    }
  
    // remember to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [navigate]);

  useEffect(() => {
    const loggedInTeacherId = localStorage.getItem('loggedInTeacherId');
    if (loggedInTeacherId) {
      const teacherInfo = accounts.teachers.find(teacher => teacher.id === loggedInTeacherId);
      if (teacherInfo) {
        setTeacherName(teacherInfo.name);
      }
    }
  }, []);

  return (
    <div className="teacher-view">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)}/>
        <div className='HeaderTeacher'>
          <h1 className='TitleTeacher'>Welcome, {teacherName}!</h1>
        </div>
        <Link to='..' className='LogoutButtonTeacher'><BiLogOut></BiLogOut></Link>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <FaBars className="close-button" onClick={() => setSidebarOpen(false)}>Close</FaBars>
          <ul>
            <li>Create a test</li>
            <li>Evaluate tests</li>
            <Link to='/examine-tests'>ExamineTests</Link>
          </ul>
        </aside>
      )}

      <section className="content">
        <div className="alert">Some of the tests are not yet evaluated!</div>
        <h2>Student Grades Distribution</h2>
        <GradeChart/>      
      </section>
    </div>
  );
}

export default TeacherView;
