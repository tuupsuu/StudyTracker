import React from 'react';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../views/TeacherView.css';

function Header({ isSidebarOpen, setSidebarOpen, teacherName, isTeacherNameLoaded, title, links }) {
  return (
    <>
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />
        <div className='HeaderTeacher'>
          {title ? <h1 className='TitleExamine'>{title}</h1> : (isTeacherNameLoaded && <h1 className='TitleTeacher'>Welcome, {teacherName}!</h1>)}
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
            {links.map((link, index) => (
              <li key={index}>
                {link.path ? <Link to={link.path}>{link.label}</Link> : link.label}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
}

export default Header;
