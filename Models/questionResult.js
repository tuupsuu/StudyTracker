const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { TestResults } = require('./result');

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


const QuestionResult = sequelize.define('QuestionResult', {
    QuesResu_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Resu_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'QuestionResults'
});


QuestionResult.belongsTo(TestResults, {
    foreignKey: 'Resu_ID',
    onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = { QuestionResult };