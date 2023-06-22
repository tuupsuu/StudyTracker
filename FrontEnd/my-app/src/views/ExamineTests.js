import React, { useState, useEffect } from 'react';
import './ExamineTests.css';
import studentsData from '../jsonFiles/grades.json';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ExamineTests() {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [displayStudents, setDisplayStudents] = useState(studentsData);
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    let sortedStudents = [...studentsData];
    if (sortOption === 'name') {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'grade-high') {
      sortedStudents.sort((a, b) => b.grade - a.grade);
    } else if (sortOption === 'grade-low') {
      sortedStudents.sort((a, b) => a.grade - b.grade);
    }
    setDisplayStudents(
      sortedStudents.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, sortOption]);

  return (
    <div className="examine-tests">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)}/>
        <div className='HeaderTeacher'>
          <h1 className='TitleTeacher'>Examine Tests</h1>
        </div>
        <Link to='..' className='LogoutButton'>Logout</Link>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <button className="close-button" onClick={() => setSidebarOpen(false)}>Close</button>
          <ul>
            <li><Link to='/teacher'>Homepage</Link></li>
            <li>Create a test</li>
            <li>Evaluate tests</li>
          </ul>
        </aside>
      )}

      <section className="content">
        <div className='sortButtons'>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="grade-high">Grade (High to Low)</option>
            <option value="grade-low">Grade (Low to High)</option>
          </select>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {displayStudents.map((student) => (
          <div key={student.id} className="student">
            <div className="student-info">
              <h2>{student.name}</h2>
              <p className='grade'>Grade: {student.grade}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ExamineTests;
