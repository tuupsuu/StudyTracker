import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StartTest.css';
import Clock from '../components/Clock';

const StartTest = () => {
  const [startTest, setStartTest] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartTest = () => {
    if (password === 'kissa') {
      setStartTest(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid password. Please try again.');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleStartTest();
    }
  };

  return (
    <div className="Container">
      <div className="TopBar">
        <Clock />
        <div className="StartTest-TextContainer">
          <h1 className="Title">Math test 2nd grade Autumn</h1>
          <p>Start the test by entering the password and pressing the button below</p>
        </div>
      </div>
      {startTest ? (
        <Link to="/example-test" className="StartTestContainer">
          <h2 className="StartTestTitle">The test is ready</h2>
          <button className="StartTestButton">Start test</button>
        </Link>
      ) : (
        <div className="StartTestContainer">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress} // Add key press event handler
            placeholder="Password"
            className="PasswordInput"
          />
          <button className="StartTestButton" onClick={handleStartTest}>
            Start test
          </button>
          {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default StartTest;
