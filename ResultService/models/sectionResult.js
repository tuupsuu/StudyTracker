const { DataTypes } = require('sequelize');
const { QuestionResult } = require('./questionResult');

const sequelize = require('./db');



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


SectionResult.belongsTo(QuestionResult, {
    foreignKey: 'QuesResu_ID',
    onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = { SectionResult };