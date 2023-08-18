const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Student = sequelize.define('Student', {
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Class_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Stud_ID: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    timestamps: false,
    tableName: 'Student',
});


sequelize.sync();

module.exports = { Student };
