const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { School } = require('./school');
const { Teacher } = require('./teacher');

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


Class.belongsTo(Teacher, {
    foreignKey: 'Teach_ID',
    onDelete: 'CASCADE'
});

Class.belongsTo(School, {
    foreignKey: 'School_ID',
    onDelete: 'CASCADE'
});

sequelize.sync();

module.exports = { Class };

// const { Student } = require('./student');

// Class.hasMany(Student, {
//     foreignKey: 'Class_ID'
// });