const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

// PERBAIKAN: Huruf awal disesuaikan menjadi kapital persis seperti nama file
const Ruangan = require('./Ruangan')(sequelize, DataTypes);
const Barang = require('./Barang')(sequelize, DataTypes);
const Peminjaman = require('./Peminjaman')(sequelize, DataTypes);

// Setup relasi
Ruangan.associate({ Peminjaman });
Peminjaman.associate({ Ruangan });

module.exports = { sequelize, Ruangan, Barang, Peminjaman };
