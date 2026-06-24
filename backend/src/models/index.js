const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Ruangan = require('./ruangan')(sequelize, DataTypes);
const Barang = require('./barang')(sequelize, DataTypes);
const Peminjaman = require('./peminjaman')(sequelize, DataTypes);

// Setup relasi
Ruangan.associate({ Peminjaman });
Peminjaman.associate({ Ruangan });

module.exports = { sequelize, Ruangan, Barang, Peminjaman };
