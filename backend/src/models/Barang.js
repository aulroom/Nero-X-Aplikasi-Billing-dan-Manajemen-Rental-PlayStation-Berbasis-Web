module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    id_barang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_barang: DataTypes.STRING,
    kategori: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    kondisi: DataTypes.STRING
  }, {
    tableName: 'barang',
    timestamps: false
  });

  return Barang;
};
