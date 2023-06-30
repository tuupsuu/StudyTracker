const BaseController = require('./baseController');
const { QuestionResult } = require('../../Models/questionResult');

class QuestionController extends BaseController {
    constructor() {
        super(QuestionResult);
    }


    // old implementations
    // async add(req, res) {
    //     try {
    //         const { Resu_ID, points } = req.body;    
    //         const questionResult = await QuestionResult.create({ Resu_ID, Points });
    //         res.status(201).json(questionResult);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }


    // async edit(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { Resu_ID, points } = req.body;
    //         const questionResult = await QuestionResult.findByPk(id);

    //         if (!questionResult) throw new Error('QuestionResult not found');

    //         questionResult.Resu_ID = Resu_ID;
    //         questionResult.Points = points;
    //         await questionResult.save();
            
    //         res.status(200).json(questionResult);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}

module.exports = new QuestionController();