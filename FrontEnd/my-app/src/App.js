import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
            <Route path="/student" element={<PrivateRoute element={<StudentView />} />} />
            <Route path="/teacher" element={<PrivateRoute element={<TeacherView />} />} />
            <Route path="/official" element={<PrivateRoute element={<OfficialView />} />} />            
            <Route path="/start-test" element={<PrivateRoute element={<StartTest />} />} />
            <Route path="/examine-tests" element={<PrivateRoute element={<ExamineTests />} />} />
            <Route path="/example-test" element={<PrivateRoute element={<ExampleTest />} />} />          
            <Route path="/examine-schools" element={<PrivateRoute element={<ExamineSchools />} />} />          
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
