const { Student } = require('./student');
const { Class } = require('./class');
const { Teacher } = require('./teacher');
const { School } = require('./school');
const { Option } = require('./option');
const { Question } = require('./question');
const { TestCategory } = require('./testCategory');
const { Test } = require('./test');

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

Option.belongsTo(Question, { 
    foreignKey: 'Ques_ID' 
});

Question.hasMany(Option, {
    foreignKey: 'Ques_ID'
});

Question.belongsTo(TestCategory, {
    foreignKey: 'Cate_ID',
    onDelete: 'CASCADE'
});

Question.belongsTo(Test, {
    foreignKey: 'Test_ID'
});

Test.hasMany(Question, {
    foreignKey: 'Test_ID'
});