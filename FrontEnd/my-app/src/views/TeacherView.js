import React from 'react';

class TeacherView extends React.Component {
  // state and methods

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Welcome, Teacher!</h1>
        <p>You can evaluate students' tests and view results from this page.</p>
      </div>
    );
  }
}

export default TeacherView;
