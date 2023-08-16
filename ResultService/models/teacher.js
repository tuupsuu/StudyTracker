const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const Teacher = sequelize.define('Teacher', {
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Teach_ID: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false,
    tableName: 'Teacher',
});


sequelize.sync();

module.exports = { Teacher };