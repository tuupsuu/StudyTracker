const BaseController = require('./baseController');
const { Student } = require('../models/student');

class studentController extends BaseController {
  constructor() {
    super(Student);
  }
}

module.exports = new studentController();