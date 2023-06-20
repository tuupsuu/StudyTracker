const express = require('express');
const bodyParser = require('body-parser');
const handleUser = require('./handleUser');
const port = 3002;
const config = require('./config');
const { Sequelize, Datatypes } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: config.ssl.require,
      ca: [config.ssl.ca],
      rejectUnauthorized: false
    }
  }
});

const app = express();
app.use(bodyParser.json());


sequelize.authenticate()
  .then(() => console.log('Connection has been extablished succesfully'))
  .catch(error => console.error('Unable to connect to the database:', error));

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
