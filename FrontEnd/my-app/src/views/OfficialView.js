import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import './OfficialView.css';
import accounts from '../jsonFiles/accounts.json';
import StudentsGrades from '../jsonFiles/grades.json';

function processCityData(cityData) {
  // Group data by classNumber
  const groupedData = cityData.reduce((acc, student) => {
    if (!acc[student.classNumber]) {
      acc[student.classNumber] = [];
    }
    acc[student.classNumber].push(student);
    return acc;
  }, {});

  // Process each class's data
  const processedData = Object.entries(groupedData).map(([classNumber, students]) => {
    // Calculate average grade
    const avgGrade = students.reduce((acc, student) => acc + student.grade, 0) / students.length;

    // Find best and worst schools
    const schoolAvgs = students.reduce((acc, student) => {
      if (!acc[student.school]) {
        acc[student.school] = { total: 0, count: 0 };
      }
      acc[student.school].total += student.grade;
      acc[student.school].count += 1;
      return acc;
    }, {});

    let worstSchool, bestSchool, worstAvg = Infinity, bestAvg = -Infinity;
    for (let school in schoolAvgs) {
      const avg = schoolAvgs[school].total / schoolAvgs[school].count;
      if (avg < worstAvg) {
        worstAvg = avg;
        worstSchool = school;
      }
      if (avg > bestAvg) {
        bestAvg = avg;
        bestSchool = school;
      }
    }

    return {
      classNumber,
      students: students.length,
      avgGrade: avgGrade.toFixed(2),
      worstSchool: worstSchool,
      worstSchoolAvg: worstAvg.toFixed(2),
      bestSchool: bestSchool,
      bestSchoolAvg: bestAvg.toFixed(2)
    };
  });

  return processedData;
}

function OfficialView() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [officialName, setOfficialName] = useState(''); 
  const [officialCity, setOfficialCity] = useState('');
  const [cityData, setCityData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const classNumbers = [...new Set(cityData.map(row => row.classNumber))];
  const [searchText, setSearchText] = useState('');
  const [studentCountFilter, setStudentCountFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    const loggedInOfficialId = localStorage.getItem('loggedInOfficialId');
    const officialCity = localStorage.getItem('officialCity');
    if (loggedInOfficialId && officialCity) {
      const officialInfo = accounts.officials.find(official => official.id === loggedInOfficialId && official.city === officialCity);
      if (officialInfo) {
        setOfficialName(officialInfo.name);
        setOfficialCity(officialCity);
      }
    }
  }, []);
  
  useEffect(() => {
    const data = StudentsGrades.filter(student => student.city === officialCity);
    setCityData(processCityData(data));
  }, [officialCity]);

  let displayData = cityData
    .filter(row => 
      !selectedClass || row.classNumber === selectedClass)
    .filter(row => 
      searchText === '' || row.classNumber.toString().includes(searchText) || row.avgGrade.toString().includes(searchText)
    )
    .filter(row => 
      studentCountFilter === 'all' ||
      (studentCountFilter === 'over30' && row.students >= 30) ||
      (studentCountFilter === 'under30' && row.students < 30)
    );

  if (sortOrder !== 'none') {
    displayData.sort((a, b) => {
      switch (sortOrder) {
        case 'studentsAsc':
          return a.students - b.students;
        case 'studentsDesc':
          return b.students - a.students;
        case 'avgAsc':
          return a.avgGrade - b.avgGrade;
        case 'avgDesc':
          return b.avgGrade - a.avgGrade;
        default:
          return 0;
      }
    });
  }
  
  return (
    <div className="official-view">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />
        <div className='HeaderOfficial'>
          <h1 className='TitleOfficial'>Welcome, {officialName}!</h1>
        </div>
        <Link to='..' className='LogoutButtonOfficial'><BiLogOut></BiLogOut></Link>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <FaBars className="close-button" onClick={() => setSidebarOpen(false)}>Close</FaBars>
          <ul>
            <li>Print Reports</li>
            <Link to='/examine-schools'>Examine Schools</Link>
          </ul>
        </aside>
      )}

      <h2 className='h2Official'>Here is a results of different Schools</h2>  

      <div className="search-and-filter-container">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchText} 
          onChange={e => setSearchText(e.target.value)} 
          className="search-bar"
        />

        <div className="filter-container">
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            className="filter"
          >
            <option value=''>All Classes</option>
            {classNumbers.map(number => (
              <option value={number} key={number}>{number}</option>
            ))}
          </select>

          <select 
            value={studentCountFilter} 
            onChange={e => setStudentCountFilter(e.target.value)}
            className="filter"
          >
            <option value="all">All amounts</option>
            <option value="over30">Over 30 students</option>
            <option value="under30">Under 30 students</option>
          </select>

          <select 
            value={sortOrder} 
            onChange={e => setSortOrder(e.target.value)}
            className="filter"
          >
            <option value="none">No sorting</option>
            <option value="studentsAsc">Students Asc</option>
            <option value="studentsDesc">Students Desc</option>
            <option value="avgAsc">Average Asc</option>
            <option value="avgDesc">Average Desc</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Students</th>
              <th>Avg Score</th>
              <th>Worst Average</th>
              <th>Best Average</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map(row => (
              <tr key={row.classNumber} className={row.students < 30 ? 'table-row-few-students' : ''}>
                <td>
                  <Link to={`/examine-schools?grade=${row.classNumber}`}>{row.classNumber}nd</Link>
                </td>
                <td>{row.students}</td>
                <td>{row.avgGrade}</td>
                <td>
                  <Link to={`/examine-schools?school=${row.worstSchool}&grade=${row.classNumber}`}>
                    {`${row.worstSchool}: ${row.worstSchoolAvg}`}
                  </Link>
                </td>
                <td>
                  <Link to={`/examine-schools?school=${row.bestSchool}&grade=${row.classNumber}`}>
                    {`${row.bestSchool}: ${row.bestSchoolAvg}`}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficialView;