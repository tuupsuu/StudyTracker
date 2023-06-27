const BaseController = require('./baseController');
const { Test } = require('../../Models/test');

class TestController extends BaseController {
    constructor() {
        super(Test);
    }


    async add(req, res) {
        try {
            const { TestName, StartTime, EndTime } = req.body;
            const test = await Test.create({ TestName, StartTime, EndTime });
            res.status(201).json(test);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }


    async edit(req, res) {
        try {
            const { id } = req.params;
            const { TestName, StartTime, EndTime } = req.body;
            const test = await Test.findByPk(id);

            if (!test) throw new Error('Test not found');

            test.TestName = TestName;
            test.StartTime = StartTime;
            test.EndTime = EndTime;
            await test.save();

            res.status(200).json(test);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}


module.exports = new TestController();