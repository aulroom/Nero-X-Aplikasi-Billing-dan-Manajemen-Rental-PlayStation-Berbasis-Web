'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('peminjaman', {
      id_peminjaman: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      id_ruangan: Sequelize.INTEGER,
      nama_penyewa: Sequelize.STRING,
      waktu_mulai: Sequelize.DATE,
      waktu_selesai: Sequelize.DATE,
      durasi: Sequelize.FLOAT,
      total_biaya: Sequelize.INTEGER,
      status_transaksi: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('peminjaman');
  }
};
