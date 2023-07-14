import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../components/AuthContext';
import axios from 'axios';

function LoginWithBackend() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  }

  const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // verify the password
    try {
      const response = await fetch('https://studytracker.site/api2/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: id,
          password: password
        })
      });
  
      const { rights, token } = response.data;

      localStorage.setItem('userRights', rights);
      storeToken(token);
      
      
      if (response.data.error === 'Invalid password') {
        alert('Invalid password');
        return;
      }
  
  
    switch(rights) {
      case 1:
        navigate("/student");
        break;
      case 2:
        navigate("/teacher");
        break;
      case 3:
        navigate("/official");
        break;
      default:
        alert('Invalid rights');
        return;
    }
  
    setIsLoggedIn(true);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify password');
      return;
    }
  }

  useEffect(() => {  
    fetch('/users', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json'
    }
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);

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