const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');
const { v4: uuidv4 } = require('uuid'); // <-- import uuid

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: { // match your DB column
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: 0
    },
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => uuidv4() // <-- auto-generate UUID
    },
    category_id: { // foreign key column
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Category,
        key: 'id'
      }
    }
  },
  {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',   // map to DB column
    updatedAt: 'updated_at'
  }
);

// Set up relation
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
