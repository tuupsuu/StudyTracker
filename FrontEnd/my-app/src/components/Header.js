import React from 'react';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../views/TeacherView.css';

function Header({ isSidebarOpen, setSidebarOpen, Name, isNameLoaded, title, links }) {
  // Check if links array is non-empty
  const hasLinks = links && links.length > 0;

  return (
    <>
      <header className="header">
        {/* Show hamburger icon only if there are links */}
        {hasLinks && <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />}
        <div className='HeaderTeacher'>
          {title ? <h1 className='TitleExamine'>{title}</h1> : (isNameLoaded && <h1 className='TitleTeacher'>Welcome, {Name}!</h1>)}
        </div>
        <Link to='..' className='LogoutButtonTeacher' onClick={() => {
          localStorage.clear();
        }}> <BiLogOut></BiLogOut>
        </Link>
      </header>

      {isSidebarOpen && hasLinks && (
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
