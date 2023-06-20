import React from 'react';
import './TeacherView.css';
import photo from '../components/graphOfGrades.jpg';
import { Link } from 'react-router-dom';


function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="teacher-view">
      <header className="header">
        <div className="hamburger" onClick={() => setSidebarOpen(true)} />
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
            <li>Examine results</li>
          </ul>
        </aside>
      )}

      <section className="content">
        <div className="alert">Some of the tests are not yet evaluated!</div>
        <img src={photo} alt="Graph of Grades" />
      </section>
    </div>
  );
}

export default TeacherView;
