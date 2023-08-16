import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Students.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Download from '../components/Download';
import Header from "../components/Header";

function OfficialView() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

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
// -------------------------------------------------------------------------------------------------------------

  // New states for dialog and Teacher
  const [openDialog, setOpenDialog] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  
  const [newTeacher, setNewTeacher] = useState(
    {FirstName: "",
    LastName: "",
    UserPassWord: "",
    Email: "",
    Rights: 2});

  // Handle dialog open and close
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Handle new Teacher data
  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value
    }));
  };

  // Add a new Teacher
  const handleAddNewTeacher = async () => {
    const { FirstName, LastName, UserPassWord, Email, Rights } = { ...newTeacher };

    // Check if any of the TextField values are empty
    if (FirstName.trim() === '' || LastName.trim() === '' || Email.trim() === '') {
      // Display an error or show a message indicating that all fields are required
      alert('Please fill in all the fields');
      return;
    }

  // Create the new Teacher object
  const newTeacherData = {
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
      body: JSON.stringify(newTeacherData)
    });
    
    if (response.ok) {
      // Teacher added successfully
      console.log('New teacher added successfully');
      // Reset the newTeacher state to its initial values
      setNewTeacher({
        FirstName: "",
        LastName: "",
        UserPassWord: "",
        Email: "",
        Rights: 2
      });
      handleDialogClose();
    } else {
      // Handle error response
      console.log('Failed to add new teacher');
    }
  } catch (error) {
    // Handle network or other errors
    console.log('Error adding new teacher:', error);
  }};

//--------------------------------------------------------------

  // Fetch Teacher
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
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
        // Filter Teacher with Rights equal to "2"
        const filteredTeachers = data.filter(teacher => teacher.Rights === 2);
        // Update the Teacher state
        setTeachers(filteredTeachers);
      } else {
        // Handle error response
        console.log('Failed to fetch teacher');
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error fetching teacher:', error);
    }
  };

//----------------------------------------------------------------
  const handleDeleteTeacher = async () => {
    try {
      // Send the HTTP DELETE request
      const response = await fetch(`https://studytracker.site/api2/${selectedTeacher.UserID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token from local storage
        }
      });

      if (response.ok) {
        // Teacher deleted successfully
        console.log('Teacher deleted successfully');
        // Remove Teacher from local state
        setTeachers(teachers.filter(teacher => teacher.id !== selectedTeacher.id));
        // Close the dialog
        handleCloseTeacherInfoDialog();
      } else {
        // Handle error response
        console.log('Failed to delete teacher');
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error deleting teacher:', error);
    }
  };

//----------------------------------------------------------------

  const handleTeacherRowClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseTeacherInfoDialog = () => {
    setSelectedTeacher(null);
  };

  const Links = [
    { label: "Homepage", path: "/official" },
    { label: "Print Reports" },
    { label: "Examine Schools", path: "/examine-schools" }
  ]; 

// -------------------------------------------------------------------------------------------------------------
  return (
    <div className="examine-tests">
      <Header
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        links={Links} 
        title="Examine Teachers" // Pass the custom title here
      />
      <section className="content">
        <div className='controls'>
          <div className="buttonsContainer">
            <div className='addStudent'>
              {/* Add new teachers button */}
              <Button className='buttonAdd' onClick={handleDialogOpen}>
                Add new teacher
              </Button>
            </div>
            <div>
              {/* Download CSV button */}
              <Download teachers={teachers} />   
            </div>
          </div>
          <TextField
            className='studentSearch'
            id="standard-basic"
            label="Search"
            variant="standard"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />                    
        </div>
      </section>

      <section className='studentTable'>
          {/* Render Teacher in a table */}
          <TableContainer>
            <Table>
              <TableBody>
                {teachers.filter((teacher) => {
                  if (searchTerm === '') {
                    return teacher;
                  } else if (
                    teacher.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    teacher.LastName.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return teacher;
                  }
                }).map((teacher, index) => (
                  <TableRow key={index} onClick={() => handleTeacherRowClick(teacher)}>
                    <TableCell>{teacher.FirstName}</TableCell>
                    <TableCell>{teacher.LastName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>           
      </section>

      {/* Add teacher dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="FirstName"
            label="FirstName"
            type="text"
            fullWidth
            onChange={handleNewTeacherChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="LastName"
            label="LastName"
            type="text"
            fullWidth
            onChange={handleNewTeacherChange}
          />          
          <TextField
            autoFocus
            margin="dense"
            name="Email"
            label="Email"
            type="text"
            fullWidth
            onChange={handleNewTeacherChange}
          />                    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewTeacher} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Teacher information dialog */}
      {selectedTeacher && (
        <Dialog open={true} onClose={handleCloseTeacherInfoDialog}>
          <DialogTitle>{`${selectedTeacher.FirstName} ${selectedTeacher.LastName}`}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="FirstName"
              label="FirstName"
              type="text"
              fullWidth
              value={selectedTeacher.FirstName}
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
              value={selectedTeacher.LastName}
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
              value={selectedTeacher.Email}
              InputProps={{
                readOnly: true,
              }}
            />                    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTeacherInfoDialog} color="primary">
              Close
            </Button>
            <Button onClick={handleDeleteTeacher} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}      
    </div>
  );
}

export default OfficialView;
