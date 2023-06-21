const { Result } = require('../Models/result');

const addResult = async (req, res) => {
  try {
    const { studentId, testId } = req.body;
    const result = await Result.create({ StudentID: studentId, TestID: testId });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const editResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, testId } = req.body;
    const result = await Result.findByPk(id);
    
    if (!result) throw new Error('Result not found');

    result.StudentID = studentId;
    result.TestID = testId;
    await result.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findByPk(id);
    
    if (!result) throw new Error('Result not found');

    await result.destroy();
    res.status(200).json({ message: 'Result deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getResults = async (req, res) => {
  try {
    const results = await Result.findAll();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addResult,
  editResult,
  deleteResult,
  getResults
};