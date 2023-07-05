const BaseController = require('./baseController');
const questionController = require('./questionController');
const { Result } = require('../models/result');

class ResultsController extends BaseController {
  constructor() {
    super(Result);
  }

  async addFromJson(req, res) {
    try {
      const testData = {
        Test_ID: req.body.Test_ID,
        Stud_ID: req.body.Stud_ID
      };

      const newTestResult = await this.add(testData);

      const questionResultsController = new questionController();
      const questionResults = req.body.QuestionResults;
      for (const questionResult of questionResults) {
        questionResult.Resu_ID = newTestResult.Resu_ID;
        await questionResultsController.addFromJson(questionResult);
      }


      res.status(201).send(newTestResult);
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the TestResult.'
      });
    }
  }

  // old implementations
  // async add(req, res) {
  //   try {
  //     const { studentId, testId } = req.body;
  //     const result = await Result.create({ Stud_ID: studentId, Test_ID: testId });
  //     res.status(201).json(result);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }


  // async edit(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { studentId, testId } = req.body;
  //     const result = await Result.findByPk(id);
      
  //     if (!result) throw new Error('Result not found');

  //     result.Stud_ID = studentId;
  //     result.Test_ID = testId;
  //     await result.save();

  //     res.status(200).json(result);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

module.exports = new ResultsController();