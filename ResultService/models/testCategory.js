const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Test } = require('./test');

const sequelize = require('./db');



const TestCategory = sequelize.define('TestCategory', {
    Cate_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    Points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CategoryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Test_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps:false,
    tableName: 'TestCategory'
});

TestCategory.belongsTo(Test, {
    foreignKey: 'Test_ID',
    onDelete: 'CASCADE'
});

sequelize.sync();

module.exports = TestCategory;