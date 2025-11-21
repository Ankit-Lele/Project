const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_system', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('DB Error:', err));
sequelize.sync({ alter: true })
  .then(() => console.log('DB synced'))
  .catch(err => console.log(err));

module.exports = sequelize;
