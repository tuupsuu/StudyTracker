import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../components/AuthContext';

function LoginWithBackend() {
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    fetch('http://172.104.236.131:81/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'id') setId(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find(user => user.UserID === parseInt(id));

    if (!user) {
      alert('Invalid ID');
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginWithBackend;
