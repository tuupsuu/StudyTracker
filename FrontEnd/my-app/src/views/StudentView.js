import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentView.css';
import Header from '../components/Header'; // Import the Header component

function StudentView() {
  const [, setStudentName] = useState('');
  const [students, setStudents] = useState([]);  // Add this line
  const navigate = useNavigate();
  const [isNameLoaded, setIsNameLoaded] = useState(false); // New state variable
  const [Name,] = useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [tests, setTests] = useState([]);

  function getRandomColor() {
    const colors = [
      '#FF5733',  // color 1
      '#33FF57',  // color 2
      '#3357FF',  // color 3
      '#FF33D4',  // color 4
      '#FFD133',  // color 5
      // ... add as many colors as you'd like
    ];
  
    return colors[Math.floor(Math.random() * colors.length)];
  }
  

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
      setIsNameLoaded(true); // Set the flag to true once the teacher name is loaded
    }

    // Adding event listener for window/tab close
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      // If page is being refreshed, sessionStorage item 'isRefreshing' will exist
      if (!sessionStorage.getItem('isRefreshing')) {
        localStorage.clear();
      }
    });

    fetch(`/api1/tests`, {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTests(data); // update state here
      })
      .catch((error) => {
        console.error(error);
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

  console.log("tests:" + tests)

  const Links = [
  ];

  return (
    <div className="StudentView-Container">
      <div className="StudentView-TopBar">
        <Header
          title="tests"
          Name={tests}
          isNameLoaded={isNameLoaded}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          links={Links}
        />
      </div>
      <div className='TestOptions'>
    {tests.map((test) => (
        <div 
            className="TestContainerButton" 
            key={test.Test_ID}
            onClick={() => {
                localStorage.setItem('currentTest', test.TestName);
                navigate(`/start-test`);
            }}
        >
            <div className="TestContainer">
                <h2 className="TestContainerTitle" style={{ backgroundColor: getRandomColor() }}>
                    {test.TestName}
                </h2>
                <div className="TestContainerInfo">
                  <p style={{color:"black"}}>{test.StartTime} <span style={{marginLeft:"20px", marginRight:"20px"}}>|</span> {test.EndTime}</p>
                </div>
            </div>
        </div>
    ))}
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