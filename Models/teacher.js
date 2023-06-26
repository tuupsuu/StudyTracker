const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

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
    },

}, {
    timestamps: false,
    tableName: 'Student',
});


sequelize.sync();

module.exports = { Teacher };