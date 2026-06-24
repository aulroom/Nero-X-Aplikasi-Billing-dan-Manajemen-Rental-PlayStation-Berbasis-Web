'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barang', {
      id_barang: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      nama_barang: Sequelize.STRING,
      kategori: Sequelize.STRING,   // <--- tambahkan ini
      stok: Sequelize.INTEGER,
      harga: Sequelize.INTEGER,
      kondisi: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('barang');
  }
};
