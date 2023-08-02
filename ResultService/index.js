const express = require('express');
const app = express();
const sequelize = require('./models/db');
const port = 3002;

const resultController = require('./controllers/resultController');
const questionController = require('./controllers/questionController');
const sectionController = require('./controllers/sectionController');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const classController = require('./controllers/classController');

app.use(express.json());
require('./models/associations');


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


// Get students of a class by class id
app.get('/resultservice/class/:classId/students', classController.getStudentsByClass);


// endpoints for handling test result data
app.post('/resultservice/results', (req, res) => resultController.add(req, res));

app.put('/resultservice/results/:id', (req, res) => resultController.edit(req, res));

app.delete('/resultservice/results/:id', resultController.delete);

app.get('/resultservice/results', resultController.getAll);


// endpoints for handling question result data
app.post('/resultservice/questionResults', (req, res) => questionController.add(req, res));

app.put('/resultservice/questionResults/:id', (req, res) => questionController.edit(req, res));

app.delete('/resultservice/questionResults/:id', questionController.delete);

app.get('/resultservice/questionResults', questionController.getAll);


// endpoints for handling question section result data
app.post('/resultservice/sectionResults', (req, res) => sectionController.add(req, res));

app.put('/resultservice/sectionResults/:id', (req, res) => sectionController.edit(req, res));

app.delete('/resultservice/sectionResults/:id', sectionController.delete);

app.get('/resultservice/sectionResults', sectionController.getAll);


// endpoints for handling student data
app.post('/resultservice/student/', (req, res) => studentController.add(req, res));

app.put('/resultservice/student/:id', (req, res) => studentController.edit(req, res));

app.delete('/resultservice/student/:id', studentController.delete);

app.get('/resultservice/student', studentController.getAll);


// endpoints for handling teacher data
app.post('/resultservice/teacher/', (req, res) => teacherController.add(req, res));

app.put('/resultservice/teacher/:id', (req, res) => teacherController.edit(req, res));

app.delete('/resultservice/teacher/:id', teacherController.delete);

app.get('/resultservice/teacher', teacherController.getAll);


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
  