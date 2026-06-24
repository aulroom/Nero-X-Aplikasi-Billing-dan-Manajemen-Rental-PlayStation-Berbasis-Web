module.exports = (sequelize, DataTypes) => {
  const Peminjaman = sequelize.define(
    "Peminjaman",
    {
      id_peminjaman: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      id_ruangan: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      nama_penyewa: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      waktu_mulai: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      waktu_selesai: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      durasi: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      total_biaya: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      status_transaksi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "peminjaman",
      freezeTableName: true,
      timestamps: false, // <-- INI YANG PENTING
    }
  );

  Peminjaman.associate = (models) => {
    Peminjaman.belongsTo(models.Ruangan, {
      foreignKey: "id_ruangan",
    });
  };

  return Peminjaman;
};