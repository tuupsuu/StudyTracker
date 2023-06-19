import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';

function App() {
  return (
      <>
        <Router> 
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/student" element={<StudentView />} />
              <Route path="/teacher" element={<TeacherView />} />
            </Routes>
          </div>
        </Router>
      </> 
  );
}

export default App;
