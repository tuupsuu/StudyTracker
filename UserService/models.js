const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'new', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserPassWord: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Rights: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false // Disable timestamps (createdAt and updatedAt columns)
});

sequelize.sync();

module.exports = { User };
