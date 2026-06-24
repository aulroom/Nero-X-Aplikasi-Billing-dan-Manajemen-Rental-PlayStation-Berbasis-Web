'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ruangan', {
      id_ruangan: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      nama_ruangan: Sequelize.STRING,
      jenis_ps: Sequelize.STRING,
      tarif_per_jam: Sequelize.INTEGER,
      status: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ruangan');
  }
};
