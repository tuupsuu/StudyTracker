const BaseController = require('./baseController');
const sectionController = require('./sectionController');
const { QuestionResult } = require('../models/questionResult');

class QuestionController extends BaseController {
    constructor() {
        super(QuestionResult);
    }

    async addFromJson(questionData) {
        try {
            const newQuestionResult = await this.add(questionData);

            const sectionResultsController = new sectionController();
            const sectionResults = questionData.SectionResults;
            for (const sectionResult of sectionResults) {
                sectionResult.QuesResu_ID = newQuestionResult.QuesResu_ID;
                await sectionResultsController.addFromJson(sectionResult)
            }
        } catch (err) {
            throw new Error(err.message || 'Some error occurred while creating the QuestionResult.');
        }
    }
}

module.exports = new QuestionController();