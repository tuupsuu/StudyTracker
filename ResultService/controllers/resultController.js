const BaseController = require('./baseController');
const questionController = require('./questionController');
const { Result } = require('../models/result');

class ResultsController extends BaseController {
  constructor() {
    super(Result);
  }

  async addFromJson(testData) {
    const transaction = await this.model.sequelize.transaction();
    try {
      const testResult = await this.add(testData, { transaction });
      for (let questionResult of testData.QuestionResults) {
        questionResult.Resu_ID = testResult.Resu_ID;
        await questionController.addFromJson(questionResult, { transaction });
      }


      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error(err.message || 'Some error occurred while creating the TestResult.');
    }
  }
}


module.exports = new ResultsController();