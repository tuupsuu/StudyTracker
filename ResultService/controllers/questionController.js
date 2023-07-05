const BaseController = require('./baseController');
const { QuestionResult } = require('../models/questionResult');

class QuestionController extends BaseController {
    constructor() {
        super(QuestionResult);
    }
}

module.exports = new QuestionController();