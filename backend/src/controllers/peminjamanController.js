const { Peminjaman, Ruangan } = require("../models");

// =======================
// GET ALL
// =======================
const getPeminjaman = async (req, res) => {
  try {
    const data = await Peminjaman.findAll({
      include: [
        {
          model: Ruangan,
        },
      ],
      order: [["id_peminjaman", "DESC"]],
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// =======================
// CREATE
// =======================
const createPeminjaman = async (req, res) => {
  try {
    const {
      id_ruangan,
      nama_penyewa,
      waktu_mulai,
      waktu_selesai,
    } = req.body;

    const data = await Peminjaman.create({
      id_ruangan: id_ruangan || null,
      nama_penyewa: nama_penyewa || null,
      waktu_mulai: waktu_mulai || null,
      waktu_selesai: waktu_selesai || null,
      durasi: 1,
      total_biaya: 0,
      status_transaksi: "aktif",
    });

    if (id_ruangan) {
      await Ruangan.update(
        {
          status: "dipakai",
        },
        {
          where: { id_ruangan },
        }
      );
    }

    res.status(201).json({
      message: "Peminjaman berhasil",
      data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// =======================
// SELESAI PEMINJAMAN
// =======================
const selesaiPeminjaman = async (req, res) => {
  try {
    const { id } = req.params;

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    await Peminjaman.update(
      {
        status_transaksi: "selesai",
      },
      {
        where: {
          id_peminjaman: id,
        },
      }
    );

    if (peminjaman.id_ruangan) {
      await Ruangan.update(
        {
          status: "kosong",
        },
        {
          where: {
            id_ruangan: peminjaman.id_ruangan,
          },
        }
      );
    }

    res.json({
      message: "Peminjaman selesai",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// =======================
// DELETE
// =======================
const deletePeminjaman = async (req, res) => {
  try {
    const { id } = req.params;

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    if (peminjaman.id_ruangan) {
      await Ruangan.update(
        {
          status: "kosong",
        },
        {
          where: {
            id_ruangan: peminjaman.id_ruangan,
          },
        }
      );
    }

    await Peminjaman.destroy({
      where: {
        id_peminjaman: id,
      },
    });

    res.json({
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getPeminjaman,
  createPeminjaman,
  selesaiPeminjaman,
  deletePeminjaman,
};