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
  
  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('jwtTokenExpiration');
    return new Date().getTime() > expirationTime;
  };

  const storeToken = (token) => {
    // Set the expiration time to 1 hour (3600 seconds) from the current time.
    const expirationTime = new Date().getTime() + 20 * 1000;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('jwtTokenExpiration', expirationTime);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    localStorage.removeItem('jwtTokenExpiration');

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
      const data = await response.json();
      const { message, rights, token, expiresIn } = data;

      if (data.error === 'Invalid password') {
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
  
      localStorage.setItem('userRights', rights);
      storeToken(token, expiresIn);
      setIsLoggedIn(true);

      const userData = await fetch('/api2', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: id
        })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
          return data; // Add this line to return the data
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
      
      localStorage.setItem('userName', `${userData.FirstName} ${userData.LastName}`);
      

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify password');
      return;
    }
  }

  useEffect(() => {  
    if (isTokenExpired()) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenExpiration');
      localStorage.removeItem('userRights');
      setIsLoggedIn(false);
      navigate("");
    } else {
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
    }
  }, [navigate, setIsLoggedIn]);


  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  }

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
