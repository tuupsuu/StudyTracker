const BaseController = require('./baseController');
const { Test } = require('../models/test');
const { Question } = require('../models/question');
const { Option } = require('../models/option');

class TestController extends BaseController {
    constructor() {
        super(Test);
    }

    async postTest(req, res) {
        try {
            const { testName, questions } = req.body;

            const test = await Test.create({
                TestName: testName
            });

            for (const questionData of questions) {
                const question = await Question.create({
                    QuestionTest: questionData.question,
                    Test_ID: test.Test_ID,
                    correctIndex: questionData.correctIndex || 0,
                });

                for (const optionValue of questionData.options) {
                    await Option.create({
                        value: optionValue,
                        Ques_ID: question.Ques_ID,
                    });
                }
            }

            res.status(201).json({ message: 'Test created succesfully.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the test'});
        }
    }

    async getTests(req, res) {
        try {
            const tests = await Test.findAll({
                include: {
                    model: Question,
                    include: Option,
                }
            });

            res.json(tests);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching tests.' });
        }
    }
}

module.exports = new TestController();