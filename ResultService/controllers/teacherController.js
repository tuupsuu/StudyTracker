const BaseController = require('./baseController');
const { Teacher } = require('../models/teacher');

class teacherController extends BaseController {
  constructor() {
    super(Teacher);
  }
}

module.exports = new teacherController();