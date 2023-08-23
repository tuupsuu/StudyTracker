const express = require('express');
const app = express();
const sequelize = require('./models/db');
const port = 3002;
require('./models/associations');

const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const classController = require('./controllers/classController');
const testController = require('./controllers/testController');

app.use(express.json());

// Post test to backend
app.post('/resultservice/tests', (req, res) => testController.postTest(req, res));

// Get all tests, questions and options
app.get('/resultservice/tests', (req, res) => testController.getTests(req, res));

// Get tests by ID
app.get('/resultservice/tests/:testId', testController.getById);

// Delete test using test ID
app.delete('/resultservice/tests/:testId', testController.deleteTest);

// Get students of a class by class id
app.get('/resultservice/class/:classId/students', classController.getStudentsByClass);

// Endpoints for handling student data
app.post('/resultservice/student/', (req, res) => studentController.add(req, res));
app.put('/resultservice/student/:id', (req, res) => studentController.edit(req, res));
app.delete('/resultservice/student/:id', studentController.delete);
app.get('/resultservice/student', studentController.getAll);

// Endpoints for handling teacher data
app.post('/resultservice/teacher/', (req, res) => teacherController.add(req, res));
app.put('/resultservice/teacher/:id', (req, res) => teacherController.edit(req, res));
app.delete('/resultservice/teacher/:id', teacherController.delete);
app.get('/resultservice/teacher', teacherController.getAll);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Authenticate database connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(error => console.error('Unable to connect to the database:', error));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/results`);
});