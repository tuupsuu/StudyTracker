const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

const sequelize = require('./db');



const Test = sequelize.define('Test', {
    Test_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TestName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartTime: {
        type:DataTypes.DATE,
        allowNull: false
    },
    EndTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'Test'
});

sequelize.sync();

module.exports = { Test };