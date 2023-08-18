const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const School = sequelize.define('School', {
    School_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SchoolName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

sequelize.sync();

module.exports = { School };