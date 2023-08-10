const BaseController = require('./baseController');
const { Student } = require('../models/student');
const { Class } = require('../models/class');

class ClassController extends BaseController {
    constructor() {
        super(Class);
        this.getStudentsByClass = this.getStudentsByClass.bind(this);
    }

    async getStudentsByClass(req, res) {
        const classId = req.params.classId;
        
        try {
            const targetClass = await this.model.findByPk(classId);

            if (!targetClass) {
                return res.status(404).json({ error: 'Class not found' });
            }

            const studentsInClass = await Student.findAll({
                where: {
                    Class_ID: classId,
                },
            });

            res.json(studentsInClass);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ClassController();