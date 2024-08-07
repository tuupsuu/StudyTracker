

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


    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const entity = await this.model.findByPk(id);

            if (!entity) throw new Error('Entity not found');
            await entity.destroy();
            res.status(200).json({ message: 'Entity deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async add(data) {
        try {
            const entity = await this.model.create(data);
            return entity;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async edit(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const entity = await this.model.findByPk(id);

            if (!entity) throw new Error('Entity not found');

            Object.assign(entity, data);
            await entity.save();
            
            res.status(200).json(entity);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BaseController;