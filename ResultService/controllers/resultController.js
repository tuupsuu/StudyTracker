const BaseController = require('./baseController');
const { Result } = require('../../Models/result');

class ResultsController extends BaseController {
  constructor() {
    super(Result);
  }


  async add(req, res) {
    try {
      const { studentId, testId } = req.body;
      const result = await Result.create({ Stud_ID: studentId, Test_ID: testId });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async edit(req, res) {
    try {
      const { id } = req.params;
      const { studentId, testId } = req.body;
      const result = await Result.findByPk(id);
      
      if (!result) throw new Error('Result not found');

      result.Stud_ID = studentId;
      result.Test_ID = testId;
      await result.save();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ResultsController();