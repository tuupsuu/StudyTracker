import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import _ from 'lodash';
import './OfficialView.css';
import StudentsGrades from '../jsonFiles/grades.json';
import accounts from '../jsonFiles/accounts.json';

function OfficialView() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [officialName, setOfficialName] = useState('');

  useEffect(() => {
    const loggedInOfficialId = localStorage.getItem('loggedInOfficialId');
    if (loggedInOfficialId) {
      const officialInfo = accounts.officials.find(official => official.id === loggedInOfficialId);
      if (officialInfo) {
        setOfficialName(officialInfo.name);
      }
    }
  }, []);  

  useEffect(() => {
    const data = _.chain(StudentsGrades)
      .groupBy('school')
      .map((value, key) => ({
        school: key,
        classes: _.chain(value)
          .groupBy('classNumber')
          .map((v, k) => ({
            classNumber: k,
            studentsCount: v.length,
            averageGrade: _.round(_.meanBy(v, 'grade'), 2)
          }))
          .value()
      }))
      .value();

    setSchoolData(data);
  }, []);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeSelectedSchool = (e) => {
    setSelectedSchool(e.target.value);
  };

  const handleChangeSelectedClass = (e) => {
    setSelectedClass(e.target.value);
  };

  const filteredData = schoolData
  .filter(school => selectedSchool === 'All' || school.school === selectedSchool)
  .map(school => ({
    ...school,
    classes: school.classes.filter(classInfo => selectedClass === 'All' || classInfo.classNumber === selectedClass)
  }))
  .filter(school => school.classes.length > 0)
  .filter(school => {
      const schoolNameMatch = school.school.toLowerCase().includes(searchTerm.toLowerCase());
      const classNameMatch = school.classes.some(classInfo => classInfo.classNumber.includes(searchTerm));
      return schoolNameMatch || classNameMatch;
  })
  .map(school => {
      if (school.school.toLowerCase().includes(searchTerm.toLowerCase())) {
          return school;
      } else {
          return {
              ...school,
              classes: school.classes.filter(classInfo => classInfo.classNumber.includes(searchTerm))
          };
      }
  });

  const lowCountSchools = [];
  filteredData.forEach(school =>
    school.classes.forEach(classInfo => {
      if (classInfo.studentsCount < 13) {
        lowCountSchools.push({ school: school.school, classNumber: classInfo.classNumber });
      }
    })
  );

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
            <li>Examine Schools</li>
          </ul>
        </aside>
      )}

      <section className="content">
        <h2>City's different Schools Score Average Distribution</h2>
        <div className="search-container">
          <input type="text" value={searchTerm} onChange={handleChangeSearchTerm} placeholder="Search school or class" />
          <select value={selectedSchool} onChange={handleChangeSelectedSchool}>
            <option value="All">All Schools</option>
            {_.uniqBy(schoolData, 'school').map(school => <option key={school.school} value={school.school}>{school.school}</option>)}
          </select>
          <select value={selectedClass} onChange={handleChangeSelectedClass}>
            <option value="All">All Classes</option>
            {_.chain(schoolData).flatMap('classes').uniqBy('classNumber').map(classInfo => <option key={classInfo.classNumber} value={classInfo.classNumber}>{classInfo.classNumber}</option>).value()}
          </select>
        </div>

        <table style={{backgroundColor: 'white'}}>
          <thead>
            <tr>
              <th>School</th>
              <th>Grade</th>
              <th>Students</th>
              <th>Avg</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(school =>
              school.classes.map(classInfo => {
                const lowStudentCount = classInfo.studentsCount < 13;
                return (
                  <tr key={school.school + classInfo.classNumber} className={lowStudentCount ? 'low-student-count' : ''}>
                    <td>{school.school}</td>
                    <td>{classInfo.classNumber}</td>
                    <td>{classInfo.studentsCount}</td>
                    <td>{classInfo.averageGrade}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        
        {lowCountSchools.length > 0 && (
          <div className='warning-container'>
            {lowCountSchools.map(({school, classNumber}) => 
              <p key={school + classNumber}>
                {`${school} grade:${classNumber} have not enough answers to be taken into account`}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default OfficialView;