import React, { useState, useEffect } from 'react';
import './Students.css';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Download from '../components/Download';
import Header from '../components/Header';

function Students() {
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.clear();
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
        localStorage.clear();
      }
    });

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

  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  //------------------------------------------------------------------------------------------

  // New states for dialog and student
  const [openDialog, setOpenDialog] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editStudent, setEditStudent] = useState(null);
  const [newStudent, setNewStudent] = useState(
    {
      FirstName: "",
      LastName: "",
      UserPassWord: "salasana",
      Email: "",
      Rights: 1
    });

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
    if (FirstName.trim() === '' || LastName.trim() === '' || Email.trim() === '') {
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
        //Tähän väliin uus POST Resultserviseen (etunimi, sukunimi, id jne kaikkee muutakin)


        // Student added successfully
        console.log('New student added successfully');
        // Reset the newStudent state to its initial values
        setNewStudent({
          FirstName: "",
          LastName: "",
          UserPassWord: "salasana",
          Email: "",
          Rights: 1
        });
        fetchStudents();
        handleDialogClose();
      } else {
        // Handle error response
        console.log('Failed to add new student');
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error adding new student:', error);
    }
  };

  //--------------------------------------------------------------

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

  //----------------------------------------------------------------
  const handleDeleteStudent = async () => {
    try {
      // Send the HTTP DELETE request
      const response = await fetch(`https://studytracker.site/api2/${selectedStudent.UserID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token from local storage
        }
      });

      if (response.ok) {
        // Student deleted successfully
        console.log('Student deleted successfully');
        // Fetch the updated list of students from the API
        fetchStudents();   // <-- Call fetchStudents again here
        // Close the dialog
        handleCloseStudentInfoDialog();
      } else {
        // Handle error response
        console.log('Failed to delete student');
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error deleting student:', error);
    }
  };

  //----------------------------------------------------------------

  const handleStudentRowClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseStudentInfoDialog = () => {
    setSelectedStudent(null);
  };
  //------------------------------------------------------------------
  const handleOpenEditDialog = (student) => {
    setEditStudent(student);
  };

  const handleCloseEditDialog = () => {
    setEditStudent(null);
  };

  const handleEditStudent = async () => {
    const { FirstName, LastName, UserPassWord, Email, Rights } = editStudent;
    try {
      const response = await fetch(`https://studytracker.site/api2/${editStudent.UserID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token from local storage
        },
        body: JSON.stringify({ FirstName, LastName, UserPassWord, Email, Rights })
      });

      if (response.ok) {
        console.log('Student edited successfully');
        // Update student in local state
        setStudents(students.map(student => student.UserID === editStudent.UserID ? editStudent : student));
        handleCloseStudentInfoDialog();
        handleCloseEditDialog();
      } else {
        console.log('Failed to edit student');
      }
    } catch (error) {
      console.log('Error editing student:', error);
    }
  };

  const teacherLinks = [
    { label: "Homepage", path: "/teacher" },
    { label: "Create a test" },
    { label: "Evaluate tests" },
    { label: "ExamineTests", path: "/examine-tests" }
  ];  
  //------------------------------------------------------------------
  return (
    <div className="examine-tests">
      <Header
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        links={teacherLinks} 
        title="Handle Students" // Pass the custom title here
      />

      <section className="content">
        <div className='controls'>
          <div className='buttonsContainer'>
            <div className='addStudent'>
              {/* Add new student button */}
              <Button className='buttonAdd' onClick={handleDialogOpen}>
                Add new student
              </Button>
            </div>
            <div>
              {/* Download CSV button */}
              <Download students={students}></Download>
            </div>
          </div>  
          <div>
            <TextField
              className='studentSearch'
              id="standard-basic"
              label="Search"
              variant="standard"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>  
        </div>
      </section>

      <section className='studentTable'>
        {/* Render students in a table */}
        <TableContainer>
          <Table>
            <TableBody>
              {students.filter((student) => {
                if (searchTerm === '') {
                  return student;
                } else if (
                  student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  student.LastName.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return student;
                }
              }).map((student, index) => (
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
            <Button onClick={handleDeleteStudent} color="primary">
              Delete
            </Button>
            <Button onClick={() => handleOpenEditDialog(selectedStudent)} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Edit student dialog */}
      {editStudent && (
        <Dialog open={true} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="FirstName"
              label="FirstName"
              type="text"
              fullWidth
              value={editStudent.FirstName}
              onChange={e => setEditStudent({ ...editStudent, FirstName: e.target.value })}
            />
            <TextField
              margin="dense"
              name="LastName"
              label="LastName"
              type="text"
              fullWidth
              value={editStudent.LastName}
              onChange={e => setEditStudent({ ...editStudent, LastName: e.target.value })}
            />
            <TextField
              margin="dense"
              name="Email"
              label="Email"
              type="text"
              fullWidth
              value={editStudent.Email}
              onChange={e => setEditStudent({ ...editStudent, Email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditStudent} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Students;