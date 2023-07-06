import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import ExampleTest from './views/ExampleTest';
import ExamineTests from './views/ExamineTests';
import StartTest from './views/StartTest';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import OfficialView from './views/OfficialView';
import ExamineSchools from './views/ExamineSchools';
import LoginWithBackend from './components/LoginWithBackend';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginWithBackend />} />
            <Route path="/student" element={<PrivateRoute><StudentView /></PrivateRoute>} />
            <Route path="/teacher" element={<PrivateRoute><TeacherView /></PrivateRoute>} />
            <Route path="/official" element={<PrivateRoute><OfficialView /></PrivateRoute>} />            
            <Route path="/start-test" element={<PrivateRoute><StartTest /></PrivateRoute>} />
            <Route path="/examine-tests" element={<PrivateRoute><ExamineTests /></PrivateRoute>} />
            <Route path="/example-test" element={<PrivateRoute><ExampleTest /></PrivateRoute>} />          
            <Route path="/examine-schools" element={<PrivateRoute><ExamineSchools /></PrivateRoute>} />          
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
