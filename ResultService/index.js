const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const config = require('./models/config');
const resultController = require('./controllers/resultController');
const questionController = require('./controllers/questionController');
const sectionController = require('./controllers/sectionController');
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


app.post('/results/addFromJson', async (req, res) => {
  try {
    await resultController.addFromJson(req.body);
    res.status(201).json({ message: 'TestResult, QuestionResults and SectionResults succesfully created.'});
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while adding the results.', error: err.message });
  }
});

app.get('/results/:id', async (req, res) => {
  try {
    const testResults = await resultController.get(req.params.id);

    res.json(testResults);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
})


// methods for handling test result data
app.post('/results', (req, res) => resultController.add(req, res));

app.put('/results/:id', (req, res) => resultController.edit(req, res));

app.delete('/results/:id', resultController.delete);

app.get('/results', resultController.getAll);

// methods for handling question result data
app.post('/questionResults', (req, res) => questionController.add(req, res));

app.put('/questionResults/:id', (req, res) => questionController.edit(req, res));

app.delete('/questionResults/:id', questionController.delete);

app.get('/questionResults', questionController.getAll);

// methods for handling question section result data
app.post('/sectionResults', (req, res) => sectionController.add(req, res));

app.put('/sectionResults/:id', (req, res) => sectionController.edit(req, res));

app.delete('/sectionResults/:id', sectionController.delete);

app.get('/sectionResults', sectionController.getAll);

// error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


sequelize.authenticate()
  .then(() => console.log('Connection has been extablished succesfully'))
  .catch(error => console.error('Unable to connect to the database:', error));


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/results`);
});
  