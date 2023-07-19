const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Student } = require('./student');
const { Test } = require('./test');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: config.ssl.require,
      ca: [config.ssl.ca],
      rejectUnauthorized: false
    }
  }
});


const Result = sequelize.define('TestResults', {
    Resu_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // TODO: StudID and TestID as foreign keys after models have been implemented 
}, {
  tableName: 'TestResults',
  timestamps: false
});


Result.belongsTo(Test, {
  foreignKey: 'Test_ID',
  onDelete: 'CASCADE'
});

Result.belongsTo(Student, {
  foreignKey: 'Stud_ID',
  onDelete: 'CASCADE'
});


sequelize.sync();

module.exports = { Result };