// categoryController.js
const Category = require('../models/Category');
const { v4: uuidv4 } = require('uuid'); // for generating unique IDs

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, unique_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryUniqueId = unique_id || uuidv4();

    const category = await Category.create({ name, unique_id: categoryUniqueId });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
