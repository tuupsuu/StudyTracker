const { Student } = require('./student');
const { Class } = require('./class');

Student.belongsTo(Class, {
    foreignKey: 'Class_ID',
    onDelete: 'CASCADE'
});

Class.hasMany(Student, {
    foreignKey: 'Class_ID'
});