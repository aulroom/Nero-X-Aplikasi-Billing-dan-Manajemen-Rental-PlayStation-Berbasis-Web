'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('peminjaman', [
      { id_peminjaman: 1, id_ruangan: 1, nama_penyewa: 'Budi', waktu_mulai: new Date(), waktu_selesai: new Date(), durasi: 2, total_biaya: 40000, status_transaksi: 'Active' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('peminjaman', null, {});
  }
};
