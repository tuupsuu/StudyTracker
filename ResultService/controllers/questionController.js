const BaseController = require('./baseController');
const { QuestionResult } = require('../../Models/questionResult');

class QuestionController extends BaseController {
    constructor() {
        super(QuestionResult);
    }
}

module.exports = new QuestionController();