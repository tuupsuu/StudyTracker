import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherView.css';
import photo from '../components/graphOfGrades.jpg';

function TeacherView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('..');
  }

  return (
    <div className="teacher-view">
      <header className="header">
        <div className="hamburger" onClick={() => setSidebarOpen(true)} />
        <h2>Welcome, teacher!</h2>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
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
