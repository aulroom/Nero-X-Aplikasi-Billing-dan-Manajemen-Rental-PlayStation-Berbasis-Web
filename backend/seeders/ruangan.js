'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ruangan', [
      { id_ruangan: 1, nama_ruangan: 'Room A', jenis_ps: 'PS5', tarif_per_jam: 20000, status: 'Kosong' },
      { id_ruangan: 2, nama_ruangan: 'Room B', jenis_ps: 'PS4', tarif_per_jam: 15000, status: 'Kosong' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ruangan', null, {});
  }
};
