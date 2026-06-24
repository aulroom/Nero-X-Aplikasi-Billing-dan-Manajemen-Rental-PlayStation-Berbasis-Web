const { Barang } = require('../models');

exports.getAllBarang = async (req, res) => {
  try {
    const data = await Barang.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const newData = await Barang.create(req.body);
    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    await Barang.update(req.body, { where: { id_barang: req.params.id } });
    res.json({ message: 'Updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    await Barang.destroy({ where: { id_barang: req.params.id } });
    res.json({ message: 'Deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
