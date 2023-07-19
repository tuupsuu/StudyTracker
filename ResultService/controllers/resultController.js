const BaseController = require('./baseController');
const questionController = require('./questionController');
const { Result } = require('../models/result');
const { QuestionResult } = require('../models/questionResult');
const { SectionResult } = require('../models/sectionResult');

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

  async get(Resu_ID) {
    let testResult = await Result.findByPk(Resu_ID);

    if (!testResult) {
      throw new Error(`No test results found with ID ${Resu_ID}`);
    }

    testResult = testResult.get({ plain: true });

    const questionResults = await QuestionResult.findAll({
      where: { Resu_ID: testResult.Resu_ID }
    });

    for (const questionResult of questionResults) {
      const sectionResults = await SectionResult.findAll({
        where: { QuesResu_ID: questionResult.QuesResu_ID }
      });

      questionResult.SectionResults = sectionResults.map(sr => sr.get({ plain: true }));
    }

    testResult.QuestionResults = questionResults.map(qr => qr.get({ plain: true }));

    return testResult;
  }
}


module.exports = new ResultsController();