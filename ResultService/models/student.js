const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
// const { Class } = require('./class');

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

// Student.belongsTo(Class, {
//   foreignKey: 'Class_ID',
//   onDelete: 'CASCADE'
// });