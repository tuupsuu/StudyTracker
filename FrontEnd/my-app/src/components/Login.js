import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import accounts from '../jsonFiles/accounts.json';

function Login() {
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('student'); // 'student', 'teacher', 'official'
  const navigate = useNavigate();

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
    if (role === 'student') {
      if (!accounts.students.find(student => student.id === id)) {
        alert('Invalid student ID');
        return;
      }
    } else {  // role is 'teacher'
      const teacher = accounts.teachers.find(teacher => teacher.id === id);
      if (!teacher || teacher.password !== password) {
        alert('Invalid teacher ID or password');
        return;
      }
    }

    navigate(`/${role}`);
  }

  return (
    <div className="login-container">
      <h1> Welcome to StudyTracker</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Role:
          <select name="role" onChange={handleInputChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <label>
          ID:
          <input type="text" name="id" onChange={handleInputChange} />
        </label>
        {role === 'teacher' && (
          <label>
            Password:
            <input type="password" name="password" onChange={handleInputChange} />
          </label>
        )}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
