import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentView.css';
import Clock from '../components/Clock';
import { BiLogOut } from 'react-icons/bi';
import Header from '../components/Header'; // Import the Header component

function StudentView() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);  // Add this line
  const navigate = useNavigate();
  const [isNameLoaded, setIsNameLoaded] = useState(false); // New state variable
  const [Name, setName] = useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    fetch(`/api1/student`, {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStudents(data); // update state here
      })
      .catch((error) => {
        console.error(error);
      });

    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.clear();
        navigate("..");
      }
    }, 1000); // checks every second

    // Set sessionStorage item on page load
    sessionStorage.setItem('isRefreshing', 'true');

    const loggedInStudentName = localStorage.getItem('loggedInStudentName');
    if (loggedInStudentName) {
      setStudentName(loggedInStudentName);
    }

    // Adding event listener for window/tab close
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      // If page is being refreshed, sessionStorage item 'isRefreshing' will exist
      if (!sessionStorage.getItem('isRefreshing')) {
        localStorage.clear();
      }
    });

    // remember to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem('isRefreshing')) {
          localStorage.clear();
        }
      });
    };
  }, [navigate]);

  const getRandomColor = () => {
    const colors = ['pink', 'lightblue', 'lime', 'red', 'yellow'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const Links = [
    { label: "Frontpage" },
  ];

  return (
    <div className="StudentView-Container">
      <div className="StudentView-TopBar">
        <Header 
          Name={Name} 
          isNameLoaded={isNameLoaded}
          isSidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          links={Links} 
        />
      </div>
      <div>
        <h2>Student List</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.FirstName} {student.Lastname} - {student.Class_ID} {student.Stud_ID}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className='TestOptions'>
        {tests.map(test => (
          <Link 
            to={`/start-test`} 
            className="TestContainerButton" 
            key={test.id}
            onClick={() => localStorage.setItem('currentTest', test.name)}
          >
            <div className="TestContainer">
              <h2 className="TestContainerTitle" style={{ backgroundColor: getRandomColor() }}>
                {test.name}
              </h2>
              <div className="TestContainerInfo">
                <p className="InfoText">Teacher: {test.teacher}</p>
                <p className="InfoText">{test.requiresPassword ? 'Requires password' : ''}</p>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}

export default StudentView;