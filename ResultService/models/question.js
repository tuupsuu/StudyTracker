const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Test } = require('./testCategory');

const sequelize = require('./db');



const Question = sequelize.define('Question', {
    Ques_ID: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    QuestionText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Cate_ID: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Question'
});


Question.belongsTo(TestCategory, {
    foreignKey: 'Cate_ID',
    onDelete: 'CASCADE'
});

sequelize.sync();

module.exports = Question;