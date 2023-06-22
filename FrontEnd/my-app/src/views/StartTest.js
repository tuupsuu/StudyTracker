import React from 'react';
import Clock from '../components/Clock';
import './StartTest.css';


class StartTest extends React.Component {
  render() {
    return (
          <div className="Container">
            <div className="TopBar">
              <Clock />
              <div className="StartTest-TextContainer">
                <h1 className="Title">Math test 2nd grade Autumn</h1>
                <p>Start the test by pressing the button below</p>
              </div>
            </div>
            <div className='StartTestContainer'>
              <h2 className='StartTestTitle'>The test is ready</h2>
              <button className='StartTestButton'>Start test</button>
            </div>
          </div>
    );
  }
}

export default StartTest;
