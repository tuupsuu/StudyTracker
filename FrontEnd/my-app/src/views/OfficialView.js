import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './OfficialView.css';

function OfficialView() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="official-view">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)}/>
        <div className='HeaderOfficial'>
          <h1 className='TitleOfficial'>Welcome, official!</h1>
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
      </section>
    </div>
  );
}

export default OfficialView;
