const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const { Class } = require('./Class');

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


const Student = sequelize.define('Student', {
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stud_ID: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  //   Class_ID: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //         model: Class, // reference to the Class model
  //         key: 'Class_ID',
  //     }
  //  }
    // TODO: ClassID as foreign key after Class model has been defined
}, {
    timestamps: false,
    tableName: 'Student',
});


Student.belongsTo(Class, {
  foreignKey: 'Class_ID',
  onDelete: 'CASCADE'
});

sequelize.sync();

module.exports = { Student };