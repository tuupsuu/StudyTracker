const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Result } = require('./result');

const sequelize = require('./db');



const QuestionResult = sequelize.define('QuestionResult', {
    QuesResu_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Resu_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    QuesName: {
        type: DataTypes.STRING(100),
    }
}, {
    timestamps: false,
    tableName: 'QuestionResults'
});


QuestionResult.belongsTo(Result, {
    foreignKey: 'Resu_ID',
    onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = { QuestionResult };