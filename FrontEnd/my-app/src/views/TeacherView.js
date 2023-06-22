import React from 'react';
import './TeacherView.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import GradeChart from '../components/GradeChart';

function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="teacher-view">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)}/>
        <div className='HeaderTeacher'>
          <h1 className='TitleTeacher'>Welcome, teacher!</h1>
        </div>
        <Link to='..' className='LogoutButton'>Logout</Link>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-button" onClick={() => setSidebarOpen(false)}>Close</button>
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
        <GradeChart />
      </section>
    </div>
  );
}

export default TeacherView;
