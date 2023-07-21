import React, { useState, useEffect } from 'react';
import './ExamineTests.css';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function Students() {
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtTokenExpiration');
        localStorage.removeItem('userRights');
        localStorage.removeItem('loggedInTeacherName');
        navigate("..");
      }
    }, 1000); // checks every second

    // Set sessionStorage item on page load
    sessionStorage.setItem('isRefreshing', 'true');

    // Adding event listener for window/tab close
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      // If page is being refreshed, sessionStorage item 'isRefreshing' will exist
      if (!sessionStorage.getItem('isRefreshing')) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtTokenExpiration');
        localStorage.removeItem('userRights');
        localStorage.removeItem('loggedInTeacherName');
      }
    });

    return () => {
      clearInterval(intervalId);
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem('isRefreshing')) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('jwtTokenExpiration');
          localStorage.removeItem('userRights');
          localStorage.removeItem('loggedInTeacherName');
        }
      });
    };
  }, [navigate]);

  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

//------------------------------------------------------------------------------------------

  // New states for dialog and student
  const [openDialog, setOpenDialog] = useState(false);
  const [students, setStudents] = useState([]);  
  const [newStudent, setNewStudent] = useState(
    {FirstName: "",
    LastName: "",
    UserPassWord: "",
    Email: "",
    Rights: 1});

  // Handle dialog open and close
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Handle new student data
  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  // Add a new student
  const handleAddNewStudent = async () => {
    const { FirstName, LastName, UserPassWord, Email, Rights } = { ...newStudent };

    // Check if any of the TextField values are empty
    if (FirstName.trim() === '' || LastName.trim() === '' || UserPassWord.trim() === '' || Email.trim() === '') {
      // Display an error or show a message indicating that all fields are required
      alert('Please fill in all the fields');
      return;
    }

  // Create the new student object
  const newStudentData = {
    FirstName,
    LastName,
    UserPassWord,
    Email,
    Rights
  };

  try {
    // Send the HTTP POST request
    const response = await fetch('https://studytracker.site/api2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token from local storage
      },
      body: JSON.stringify(newStudentData)
    });
    
    if (response.ok) {
      // Student added successfully
      console.log('New student added successfully');
      // Reset the newStudent state to its initial values
      setNewStudent({
        FirstName: "",
        LastName: "",
        UserPassWord: "",
        Email: "",
        Rights: 1
      });
      handleDialogClose();
    } else {
      // Handle error response
      console.log('Failed to add new student');
    }
  } catch (error) {
    // Handle network or other errors
    console.log('Error adding new student:', error);
  }};

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Send the HTTP GET request
      const response = await fetch('https://studytracker.site/api2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token from local storage
        }
      });

      if (response.ok) {
        // Parse the response as JSON
        const data = await response.json();
        // Filter students with Rights equal to "1"
        const filteredStudents = data.filter(student => student.Rights === 1);
        // Update the students state
        setStudents(filteredStudents);
      } else {
        // Handle error response
        console.log('Failed to fetch students');
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error fetching students:', error);
    }
  };


  return (
    <div className="examine-tests">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)}/>
        <div className='HeaderTeacher'>
          <h1 className='TitleExamine'>Students</h1>
        </div>
        <Link to='..' className='LogoutButtonTeacher' onClick={() => {
          localStorage.removeItem('jwtTokenExpiration');
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('loggedInTeacherName');
          }}> <BiLogOut></BiLogOut>
        </Link>      
      </header>
      {isSidebarOpen && (
        <aside className="sidebar">
          <FaBars className="close-button" onClick={() => setSidebarOpen(false)}>Close</FaBars>
          <ul>
            <li><Link to='/teacher'>Homepage</Link></li>
            <li><Link to='/examine-tests'>ExamineTests</Link></li>
            <li>Create a test</li>
            <li>Evaluate tests</li>
          </ul>
        </aside>
      )}

      <section className="content">
        <div className='controls'>
          <div className='addStudent'>
            {/* Add new student button */}
            <Button className='buttonAdd' onClick={handleDialogOpen}>
              Add new student
            </Button>
          </div>
          
          {/* Render the list of students */}
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.FirstName} {student.LastName}
              </li>
            ))}
          </ul>            
        </div>
      </section>

      {/* Add student dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="FirstName"
            label="FirstName"
            type="text"
            fullWidth
            onChange={handleNewStudentChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="LastName"
            label="LastName"
            type="text"
            fullWidth
            onChange={handleNewStudentChange}
          />          
          <TextField
            autoFocus
            margin="dense"
            name="UserPassWord"
            label="UserPassWord"
            type="text"
            fullWidth
            onChange={handleNewStudentChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Email"
            label="Email"
            type="text"
            fullWidth
            onChange={handleNewStudentChange}
          />                    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewStudent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Students;