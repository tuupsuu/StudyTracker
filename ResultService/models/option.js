const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Option = sequelize.define('Option', {
    optionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ques_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
        timestamps: false,
        tableName: 'Options'
});

sequelize.sync();

module.exports = { Option };