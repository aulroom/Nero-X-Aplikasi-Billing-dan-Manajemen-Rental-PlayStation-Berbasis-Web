const { Sequelize } = require('sequelize');

// Ambil environment (Render akan memakai 'development' sesuai setting kita tadi)
const env = process.env.NODE_ENV || 'development';

// Baca file config.json
const config = require('./config.json')[env];

// Buat koneksi menggunakan data dari config.json
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions
  }
);

module.exports = sequelize;
