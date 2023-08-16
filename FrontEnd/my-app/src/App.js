import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import ExampleTest from './views/ExampleTest';
import ExamineTests from './views/ExamineTests';
import ExamineTeachers from './views/ExamineTeachers';
import StartTest from './views/StartTest';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import OfficialView from './views/OfficialView';
import CreateTests from './views/CreateTests';
import ExamineSchools from './views/ExamineSchools';
import LoginWithBackend from './components/LoginWithBackend';
import Students from './views/Students';

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
            <Route path="/start-test:testId" element={<PrivateRoute element={<StartTest />} />} />
            <Route path="/examine-tests" element={<PrivateRoute element={<ExamineTests />} />} />
            <Route path="/example-test" element={<PrivateRoute element={<ExampleTest />} />} />
            <Route path="/create-tests" element={<PrivateRoute element={<CreateTests />} />} />
            <Route path="/examine-schools" element={<PrivateRoute element={<ExamineSchools />} />} />
            <Route path="/students" element={<PrivateRoute element={<Students />} />} />
            <Route path="/examine-teachers" element={<PrivateRoute element={<ExamineTeachers />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
