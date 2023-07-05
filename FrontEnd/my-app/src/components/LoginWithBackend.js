import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import accounts from '../jsonFiles/accounts.json';
import AuthContext from '../components/AuthContext';


function LoginWithBackend() {
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('student'); // 'student', 'teacher', 'official'
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    fetch('http://userservicecontainer:3002/users')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'role') setRole(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the user's credentials
    let user;
    if (role === 'student') {
      user = accounts.students.find(student => student.id === id);
      if (!user) {
        alert('Invalid student ID');
        return;
      }
      localStorage.setItem('loggedInStudentId', id);
      localStorage.setItem('loggedInStudentName', user.name); // Save the student name
    } else if (role === 'teacher' || role === 'official') {
      user = accounts[role + 's'].find(user => user.id === id);
      if (!user || user.password !== password) {
        alert(`Invalid ${role} ID or password`);
        return;
      }
    }

    // If user is a teacher, save their school and class in localStorage
    if (role === 'teacher') {
      localStorage.setItem('teacherSchool', user.school);
      localStorage.setItem('teacherClass', user.class);
      localStorage.setItem('loggedInTeacherId', id); // Save the teacher ID    
    }
      
    if (role === 'official') {
      const official = accounts.officials.find(official => official.id === id);
      if (official) {
        localStorage.setItem('officialCity', official.city);
        localStorage.setItem('loggedInOfficialId', id);
      } else {
        alert(`Invalid official ID or password`);
        return;
      }
    }

    setIsLoggedIn(true);
    navigate(`/${role}`);
  }

  return (
    <div className="login-container">
      <h1 className='welcommingH1'> Welcome to StudyTracker </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className='loginRole'>Role:
          <select className="loginOptions" name="role" onChange={handleInputChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="official">City Official</option>
          </select>
        </label>
        <label className='loginId'>ID:
          <input type="text" name="id" onChange={handleInputChange} />
        </label>
        {(role === 'teacher' || role === 'official') && (
          <label className='loginPassword'>Password:
            <input type="password" name="password" onChange={handleInputChange} />
          </label>
        )}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginWithBackend;
