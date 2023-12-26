

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'archived'),
    defaultValue: 'active',
  },
});

module.exports = Note;
