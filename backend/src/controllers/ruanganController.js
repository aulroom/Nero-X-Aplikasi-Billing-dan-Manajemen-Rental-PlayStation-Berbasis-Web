const { Ruangan } = require("../models");

// GET
const getRuangan = async (req, res) => {
  try {
    const data = await Ruangan.findAll();

    const fixed = data.map((item) => ({
      ...item.toJSON(),
      status: item.status || "kosong",
    }));

    res.json(fixed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createRuangan = async (req, res) => {
  try {
    const data = await Ruangan.create({
      nama_ruangan: req.body.nama_ruangan,
      jenis_ps: req.body.jenis_ps,
      tarif_per_jam: req.body.tarif_per_jam,

      // ❌ jangan hardcode status terus
      status: req.body.status || "kosong",
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateRuangan = async (req, res) => {
  try {
    await Ruangan.update(req.body, {
      where: { id_ruangan: req.params.id },
    });

    res.json({ message: "Berhasil update" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteRuangan = async (req, res) => {
  try {
    await Ruangan.destroy({
      where: { id_ruangan: req.params.id },
    });

    res.json({ message: "Berhasil delete" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// EXPORT (INI YANG WAJIB)
module.exports = {
  getRuangan,
  createRuangan,
  updateRuangan,
  deleteRuangan,
};