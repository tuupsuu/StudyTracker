const BaseController = require('./baseController');
const sectionController = require('./sectionController');
const { QuestionResult } = require('../models/questionResult');

class QuestionController extends BaseController {
    constructor() {
        super(QuestionResult);
    }

    async addFromJson(questionData, options = {}) {
        try {
            const questionResult = await this.add(questionData, options);
            for (let sectionResult of questionData.SectionResults) {
                sectionResult.QuesResu_ID = questionResult.QuesResu_ID;
                await sectionController.addFromJson(sectionResult, options)
            }
        } catch (err) {
            throw new Error(err.message || 'Some error occurred while creating the QuestionResult.');
        }
    }
}

module.exports = new QuestionController();