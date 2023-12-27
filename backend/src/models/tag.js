// src/models/tag.js

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Tag;
