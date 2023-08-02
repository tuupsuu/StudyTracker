const { Student } = require('./student');
const { Class } = require('./class');
const { Teacher } = require('./teacher');
const { School } = require('./school');

Student.belongsTo(Class, {
    foreignKey: 'Class_ID',
    onDelete: 'CASCADE'
});

Class.belongsTo(Teacher, {
    foreignKey: 'Teach_ID',
    onDelete: 'CASCADE'
});

Class.belongsTo(School, {
    foreignKey: 'School_ID',
    onDelete: 'CASCADE'
});

Class.hasMany(Student, {
    foreignKey: 'Class_ID'
});