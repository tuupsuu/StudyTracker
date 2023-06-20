import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <AuthProvider>
        <Router> 
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/student" element={<PrivateRoute><StudentView /></PrivateRoute>} />
              <Route path="/teacher" element={<PrivateRoute><TeacherView /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider> 
  );
}

export default App;
