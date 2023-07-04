const BaseController = require('./baseController');
const { SectionResult } = require('../../Models/sectionResult');

class sectionController extends BaseController {
  constructor() {
    super(SectionResult);
  }
}

module.exports = new sectionController();