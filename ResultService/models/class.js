const { DataTypes } = require('sequelize');

const sequelize = require('./db');

const Class = sequelize.define('Class', {
    Class_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ClassName: {
        type: DataTypes.CHAR(2),
        allowNull: false
    },
    Teach_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    School_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Class'
});

sequelize.sync();

module.exports = { Class };