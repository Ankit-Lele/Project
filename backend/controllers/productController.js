const Product = require('../models/Product');
const Category = require('../models/Category');
const db = require('../config/db');
const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const XLSX = require('xlsx');
const { v4: uuidv4 } = require('uuid');

// ----------------- Create Single Product -----------------
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category_id, image_url } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Name, price, and category_id are required' });
    }

    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      price,
      category_id,
      image_url: image_url || null,
      unique_id: uuidv4()
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ----------------- Get Products (search by product & category) -----------------
exports.getProducts = async (req, res) => {
  try {
    let { page = 1, size = 10, sort = 'ASC', search = '' } = req.query;

    page = parseInt(page);
    size = parseInt(size);
    const offset = (page - 1) * size;

    const { Op } = require('sequelize');

    const products = await Product.findAndCountAll({
      include: [{
        model: Category,
        required: false
      }],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },                   // product name
          { '$Category.name$': { [Op.like]: `%${search}%` } }      // category name
        ]
      },
      limit: size,
      offset,
      order: [['price', sort.toUpperCase()]]
    });

    res.json({
      total: products.count,
      page,
      pages: Math.ceil(products.count / size),
      data: products.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category_id, image_url } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (name) product.name = name;
    if (price) product.price = price;
    if (category_id) product.category_id = category_id;
    if (image_url) product.image_url = image_url;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------- Bulk Upload (CSV/XLSX) -----------------

exports.bulkUpload = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const results = [];

        // Read CSV
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (let row of results) {
                    const catName = row.category?.trim();
                    if (!catName) continue;

                    // Find category
                    let cat = await Category.findOne({ where: { name: catName } });
                    if (!cat) {
                        // Optionally create category if it doesn't exist
                        cat = await Category.create({ name: catName });
                    }

                    // Create product
                    await Product.create({
                        name: row.name?.trim(),
                        price: parseFloat(row.price) || 0,
                        category_id: cat.id,
                        image: row.image?.trim() || null
                    });
                }
                res.json({ message: 'Bulk upload completed' });
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ----------------- CSV Report -----------------
exports.generateReport = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });

    const csvWriter = createObjectCsvWriter({
      path: 'report.csv',
      header: [
        { id: 'name', title: 'Product Name' },
        { id: 'price', title: 'Price' },
        { id: 'category', title: 'Category' }
      ]
    });

    const data = products.map(p => ({
      name: p.name,
      price: p.price,
      category: p.Category.name
    }));

    await csvWriter.writeRecords(data);

    res.download('report.csv');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ----------------- XLSX Report -----------------
exports.generateXLSXReport = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });

    const data = products.map(p => ({
      Name: p.name,
      Price: p.price,
      Category: p.Category?.name || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    const filePath = 'report.xlsx';
    XLSX.writeFile(workbook, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};