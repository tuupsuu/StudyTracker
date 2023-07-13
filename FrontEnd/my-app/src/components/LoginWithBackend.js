import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../components/AuthContext';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api2',
  headers: {
    'Content-Type': 'application/json',
  },
});

function LoginWithBackend() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api2/users');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

const handleInputChange = (event) => {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  if (name === 'id') setId(value);
  else if (name === 'password') setPassword(value);
}
  
    fetchUsers();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = users.find((user) => user.UserID.toString() === id);
  
    if (!user) {
      alert('Invalid ID');
      return;
    }
  
    try {
      const response = await api.post('/verify', {
        userID: id,
        password: password,
      });
  
      const { token, rights } = response.data;

      // Store the token and rights in local storage or a secure storage mechanism
      localStorage.setItem('token', token);
      localStorage.setItem('rights', rights);
  
      switch (user.Rights) {
        case 1:
          navigate('/student');
          break;
        case 2:
          navigate('/teacher');
          break;
        case 3:
          navigate('/official');
          break;
        default:
          alert('Invalid rights');
          return;
      }
  
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login');
    }
  };
  
  

  return (
    <div className="login-container">
      <h1 className='welcomingH1'> Welcome to StudyTracker </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className='loginId'>ID:
          <input type="text" name="id" onChange={handleInputChange} />
        </label>
        <label className='loginPassword'>Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginWithBackend;
