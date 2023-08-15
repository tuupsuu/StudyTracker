const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const Test = sequelize.define('Test', {
    Test_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TestName: {
        type: DataTypes.STRING,
        defaultValue: 'Test'
        // allowNull: false
    },
    StartTime: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        // allowNull: false
    },
    EndTime: {
        type: DataTypes.DATE,
        defaultValue: null,
        // allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'Test'
});

sequelize.sync();

module.exports = { Test };