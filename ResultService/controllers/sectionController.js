const BaseController = require('./baseController');
const { SectionResult } = require('../models/sectionResult');

class sectionController extends BaseController {
  constructor() {
    super(SectionResult);
  }

  async addFromJson(sectionData, options = {}) {
    try {
        await this.add(sectionData, options);
    } catch (err) {
        throw new Error(err.message || 'Some error occurred while creating the SectionResult.');
    }
  }
}

module.exports = new sectionController();