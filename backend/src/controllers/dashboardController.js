const { Ruangan, Barang, Peminjaman } = require("../models");

const getDashboard = async (req, res) => {
  try {
    const totalRuangan = await Ruangan.count();
    const totalBarang = await Barang.count();
    const totalPeminjaman = await Peminjaman.count();

    const peminjamanAktif = await Peminjaman.count({
      where: { status: "aktif" },
    });

    const pendapatan = await Peminjaman.findAll({
      where: { status: "selesai" },
    });

    // contoh simple hitung pendapatan (kalau belum ada harga DB)
    let totalPendapatan = 0;

    pendapatan.forEach((p) => {
      const jam =
        (new Date(`2000-01-01 ${p.jam_selesai}`) -
          new Date(`2000-01-01 ${p.jam_mulai}`)) /
        (1000 * 60 * 60);

      totalPendapatan += Math.max(jam, 0) * 10000;
    });

    res.json({
      totalRuangan,
      totalBarang,
      totalPeminjaman,
      peminjamanAktif,
      totalPendapatan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboard };