import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../components/AuthContext';

function LoginWithBackend() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    fetch('https://studytracker.site')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = users.find(user => user.UserID.toString() === id);
  
    if (!user) {
      alert('Invalid ID');
      return;
    }
  
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
  
      const data = await response.json();
      
      
      if (data.error === 'Invalid password') {
        alert('Invalid password');
        return;
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify password');
      return;
    }
  
    switch(user.Rights) {
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