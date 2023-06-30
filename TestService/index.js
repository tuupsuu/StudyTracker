const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const config = require('../Models/config');
const testController = require('./controllers/testController');
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
app.use(express.json());

app.post('/tests', (req, res) => testController.add(req, res));

app.put('/tests/:id', (req, res) => testController.edit(req, res));

app.delete('/tests/:id', testController.delete);

app.get('/tests', testController.getAll);

sequelize.authenticate()
  .then(() => console.log('Connection has been extablished succesfully'))
  .catch(error => console.error('Unable to connect to the database:', error));


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/users`);
});
  