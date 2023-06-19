const express = require('express');
const bodyParser = require('body-parser');
const handleUser = require('./handleUser');
const port = 3002;

const app = express();
app.use(bodyParser.json());

// Get all users
app.get('/users', handleUser.getUsers);

// Add a new user
app.post('/users', handleUser.addUser);

// Update an existing user
app.put('/users/:id', handleUser.editUser);

// Delete a user
app.delete('/users/:id', handleUser.removeUser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/users`);
});
