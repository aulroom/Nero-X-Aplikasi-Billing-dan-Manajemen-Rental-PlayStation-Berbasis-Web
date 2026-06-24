const { Sequelize } = require('sequelize');

// Koneksi ke MySQL tanpa password
const sequelize = new Sequelize('nero_x', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
