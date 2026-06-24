'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('barang', [
      { id_barang: 1, nama_barang: 'PS5 Controller', kategori: 'Aksesoris', stok: 5, harga: 500000, kondisi: 'Baik' },
      { id_barang: 2, nama_barang: 'HDMI Cable', kategori: 'Kabel', stok: 10, harga: 50000, kondisi: 'Baik' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('barang', null, {});
  }
};
