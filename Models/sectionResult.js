const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { QuestionResults } = require('./questionResult');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: config.ssl.require,
        ca: [config.ssl.ca],
        rejectUnauthorized: false
      }
    }
});


const SectionResult = sequelize.define('SectionResult', {
    SecResu_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Section: {
        type: DataTypes.STRING(3),
        allowNull:false
    },
    Points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    QuesResu_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'SectionResults'
});


SectionResult.belongsTo(QuestionResults, {
    foreignKey: 'QuesResu_ID',
    onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = { SectionResult };