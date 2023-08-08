import React, { useState, useEffect } from 'react';
import './ExamineTests.css';
import studentsData from '../jsonFiles/grades.json';
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';
import { BiPrinter } from 'react-icons/bi';
import Header from '../components/Header'; // Adjust the path if necessary

function ExamineTests() {
    const navigate = useNavigate();
    const [setOfficialName] = useState("");

  function downloadCSV() {
    const csv = Papa.unparse(displayStudents);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create link element
    let link = document.createElement('a');
    link.href = URL.createObjectURL(csvData);
    link.style.display = 'none';
    link.download = 'student_data.csv';
    
    // Append to html link element page
    document.body.appendChild(link);
    
    // Start download
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  }

  useEffect(() => {
    const isTokenExpired = () => {
      const expirationTime = localStorage.getItem("jwtTokenExpiration");
      return new Date().getTime() > expirationTime;
    };

    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.clear();
        navigate("..");
      }
    }, 1000); // checks every second

    sessionStorage.setItem("isRefreshing", "true");

    const loggedInOfficialName = localStorage.getItem("loggedInOfficialName");
    if (loggedInOfficialName) {
      setOfficialName(loggedInOfficialName);
    }

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      if (!sessionStorage.getItem("isRefreshing")) {
        localStorage.clear();
      }
    });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem("isRefreshing")) {
          localStorage.clear();
        }
      });
    };
  }, [navigate]);

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [displayStudents, setDisplayStudents] = useState(studentsData);
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [avgGrade, setAvgGrade] = useState(0);
  
  // Retrieve teacher's school and class from localStorage
  const teacherSchool = localStorage.getItem('teacherSchool');
  const teacherClass = localStorage.getItem('teacherClass');

  useEffect(() => {
    setAvgGrade(studentsData.reduce((sum, student) => sum + student.grade, 0) / studentsData.length);
  }, []);

  useEffect(() => {
    let sortedStudents = [...studentsData];

    if (sortOption === 'name') {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'grade-high') {
      sortedStudents.sort((a, b) => b.grade - a.grade);
    } else if (sortOption === 'grade-low') {
      sortedStudents.sort((a, b) => a.grade - b.grade);
    } else if (sortOption === 'below-average') {
      sortedStudents = sortedStudents.filter(student => student.grade < avgGrade);
    }

    // Filter students by teacher's school and class
    setDisplayStudents(
      sortedStudents.filter((student) =>
        (student.school === teacherSchool && student.class === teacherClass) &&
        (student.name.toLowerCase().includes(search.toLowerCase()) || 
        student.grade.toString() === search)
      )
    );
  }, [search, sortOption, avgGrade, teacherSchool, teacherClass]);

  return (
    <div className="examine-tests">
      <Header
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        title="Examine Tests" // Here's the custom title
      />
      <section className="content">
        <div className='controls'>
          <div className='sortButtons'>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="grade-high">Grade (High to Low)</option>
              <option value="grade-low">Grade (Low to High)</option>
              <option value="below-average">Below Average</option>
            </select>
            <input
              type="text"
              placeholder="Search by name or grade"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='csvButton'>
            <button className='DownloadCSV' onClick={downloadCSV}><BiPrinter></BiPrinter></button>
          </div>
        </div>

        {displayStudents.map((student) => (
          <div key={student.id} className="student">
            <div className="student-info">
              <h2 className>{student.name}</h2>
              <p className='grade' style={{ color: student.grade >= avgGrade ? 'black' : 'red' }}>
                Grade: {student.grade}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ExamineTests;
