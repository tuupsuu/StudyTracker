import React, { useState, useEffect } from 'react';
import './Students.css';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import { json2csv } from 'json2csv'; 
import { saveAs } from 'file-saver';

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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);  
  const [searchInput, setSearchInput] = useState('');  
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

//--------------------------------------------------------------

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, [searchTerm]);

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
        const data = await response.json();
        const filteredStudents = data.filter(student => student.Rights === 1);
        setStudents(filteredStudents);
  
        // filtering students based on search term
        if (searchTerm !== "") {
          const searchFiltered = filteredStudents.filter(student => student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()));
          setFilteredStudents(searchFiltered);
        } else {
          setFilteredStudents(filteredStudents);
        }
      }
    } catch (error) {
      console.log('Error fetching students:', error);
    }
  };
//----------------------------------------------------------------

  const handleStudentRowClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseStudentInfoDialog = () => {
    setSelectedStudent(null);
  };
//----------------------------------------------------------------
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to filter students
  const filterStudents = () => {
    const filtered = students.filter(student => student.FirstName.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredStudents(filtered);
  };  

// Function to download students data
  const downloadStudentsData = () => {
    const csvData = json2csv.parse(filteredStudents, { fields: ['FirstName', 'LastName', 'UserPassWord'] });
    const blob = new Blob([csvData], { type: "text/csv" });
    saveAs(blob, 'students_data.csv');
  };

//----------------------------------------------------------------
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
          <IconButton onClick={filterStudents}>
            <SearchIcon />
          </IconButton>
          <div className='addStudent'>
            {/* Add new student button */}
            <Button className='buttonAdd' onClick={handleDialogOpen}>
              Add new student
            </Button>
          </div>
          <InputBase
            placeholder="Search by name"
            inputProps={{ 'aria-label': 'search by name' }}
            value={searchInput}
            onChange={handleSearchInputChange}
          />   
          <IconButton onClick={downloadStudentsData}>
            <GetAppIcon />
          </IconButton>
        </div>
      </section>

      <section className='table'>
          {/* Render students in a table */}
          <TableContainer>
            <Table>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={index} onClick={() => handleStudentRowClick(student)}>
                    <TableCell>{student.FirstName}</TableCell>
                    <TableCell>{student.LastName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> 
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

      {/* Student information dialog */}
      {selectedStudent && (
        <Dialog open={true} onClose={handleCloseStudentInfoDialog}>
          <DialogTitle>{`${selectedStudent.FirstName} ${selectedStudent.LastName}`}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="FirstName"
              label="FirstName"
              type="text"
              fullWidth
              value={selectedStudent.FirstName}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              name="LastName"
              label="LastName"
              type="text"
              fullWidth
              value={selectedStudent.LastName}
              InputProps={{
                readOnly: true,
              }}
            />          
            <TextField
              margin="dense"
              name="UserPassWord"
              label="UserPassWord"
              type="text"
              fullWidth
              value={selectedStudent.UserPassWord}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="dense"
              name="Email"
              label="Email"
              type="text"
              fullWidth
              value={selectedStudent.Email}
              InputProps={{
                readOnly: true,
              }}
            />                    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentInfoDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}      
    </div>
  );
}

export default Students;