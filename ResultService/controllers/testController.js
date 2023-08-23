const BaseController = require('./baseController');
const { Test } = require('../models/test');
const { Question } = require('../models/question');
const { Option } = require('../models/option');

class TestController extends BaseController {
    constructor() {
        super(Test);
    }

    // Create a new test along with its questions and options
    async postTest(req, res) {
        try {
            const { testName, questions } = req.body;

            // Create the test
            const test = await Test.create({
                TestName: testName
            });

            // Create questions and their options for the test
            for (const questionData of questions) {
                const question = await Question.create({
                    QuestionText: questionData.question,
                    Test_ID: test.Test_ID,
                    correctIndex: questionData.correctIndex || 0,
                    time: questionData.time || null,
                    type: questionData.type || ''
                });

                for (const optionValue of questionData.options) {
                    await Option.create({
                        value: optionValue,
                        Ques_ID: question.Ques_ID,
                    });
                }
            }

            res.status(201).json({ message: 'Test created successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the test' });
        }
    }

    // Fetch all tests along with their questions and options
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

    // Fetch a test by its ID along with its questions and options
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

    // Delete a test by its ID, including its questions and options
    async deleteTest(req, res) {
        try {
            const testId = req.params.testId;

            const test = await Test.findByPk(testId, {
                include: {
                    model: Question,
                    include: Option
                }
            });

            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            
            // Delete options associated with each question
            for (const question of test.Questions) {
                await Option.destroy({
                    where: {
                        Ques_ID: question.Ques_ID
                    }
                });
            }
            
            // Delete questions associated with the test
            await Question.destroy({
                where: {
                    Test_ID: testId
                }
            });

            // Delete the test itself
            await Test.destroy({
                where: {
                    Test_ID: testId
                }
            });

            res.json({ message: 'Test deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the test.' });
        }
    }
}

module.exports = new TestController();