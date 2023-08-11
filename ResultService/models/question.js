const { DataTypes } = require('sequelize');
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
    correctIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    Cate_ID: {
        type:DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'Question'
});


sequelize.sync();

module.exports = { Question };