module.exports = (sequelize, DataTypes) => {
  const Ruangan = sequelize.define(
    "Ruangan",
    {
      id_ruangan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nama_ruangan: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      jenis_ps: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tarif_per_jam: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "kosong",
      },
    },
    {
      tableName: "ruangan",
      timestamps: false,
    }
  );

  Ruangan.associate = (models) => {
    Ruangan.hasMany(models.Peminjaman, {
      foreignKey: "id_ruangan",
    });
  };

  return Ruangan;
};