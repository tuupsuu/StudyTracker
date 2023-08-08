import React from 'react';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';


function Header({ isSidebarOpen, setSidebarOpen, teacherName, isTeacherNameLoaded }) {
  return (
    <>
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
    </>
  );
}

export default Header;
