import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  state = {
    id: '',
    password: '',
    role: 'student', // 'student', 'teacher', 'official'
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { role } = this.state;
    this.props.history.push(`/${role}`);
  }

  render() {
    return (
      <div style={{ width: '300px', margin: '0 auto', marginTop: '200px' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            ID:
            <input type="text" name="id" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Role:
            <select name="role" onChange={this.handleInputChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
