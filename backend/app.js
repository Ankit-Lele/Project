const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoute');
const productRoutes = require('./routes/productRoute');

const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware to parse JSON requests
app.use(bodyParser.json()); // parses application/json
app.use(bodyParser.urlencoded({ extended: true }));    // parses application/x-www-form-urlencoded


// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/products", productRoutes);


// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sync DB and start server
sequelize.sync().then(() => console.log('DB Synced'));

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
