const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const config = require('../Models/config');
const handleResult = require('./handleResult');
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

app.post('/results', handleResult.addResult);

app.put('/results/:id', handleResult.editResult);

app.delete('/results/:id', handleResult.deleteResult);

app.get('/results', handleResult.getResults);

sequelize.authenticate()
  .then(() => console.log('Connection has been extablished succesfully'))
  .catch(error => console.error('Unable to connect to the database:', error));


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/users`);
});
  