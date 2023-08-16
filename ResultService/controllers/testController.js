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
                    QuestionText: questionData.question,
                    Test_ID: test.Test_ID,
                    correctIndex: questionData.correctIndex || 0,
                    time: questionData.time || null,
                    type: questionData.type || ''
                });

                for (const optionValues of questionData.options) {
                    for (const optionValue of optionValues) {
                        await Option.create({
                            value: optionValue,
                            Ques_ID: question.Ques_ID,
                        });
                    }
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


    async getById(req, res) {
        try {
            const testId = req.params.testId;

            const test = await Test.findByPk(testId, {
                include: {
                    model: Question,
                    include: Option,
                }
            });

            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }

            res.json(test);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching tests by ID' });
        }
    }
}

module.exports = new TestController();