

class BaseController {
    constructor(model) {
        this.model = model;
    }


    getAll = async (req, res) => {
        try {
            const items = await this.model.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    }


}

module.exports = BaseController;