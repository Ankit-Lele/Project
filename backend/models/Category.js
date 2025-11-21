const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid'); // for generating unique IDs

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => uuidv4() // auto-generate UUID if not provided
    }
  },
  {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = Category;
