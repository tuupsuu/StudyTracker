const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Class } = require('./class');
const { Test } = require('./test');
const { Teacher } = require('./teacher');

const sequelize = require('./db');


const TestAssignment = sequelize.define('TestAssignment', {
    Assi_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    timestamps:false,
    tableName: 'TestAssignment'
})


TestAssignment.belongsTo(Test, {
    foreignKey: 'Test_ID',
    onDelete: 'CASCADE'
});

TestAssignment.belongsTo(Class, {
    foreignKey: 'Class_ID',
    onDelete: 'CASCADE'
});

TestAssignment.belongsTo(Teacher, {
    foreignKey: 'Teach_ID',
    onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = TestAssignment;