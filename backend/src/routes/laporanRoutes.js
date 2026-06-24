const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Peminjaman = require('../models/Peminjaman');

router.get('/pendapatan', async (req,res)=>{
  const { from, to } = req.query;
  const rows = await Peminjaman.findAll({ where:{ waktu_mulai:{ [Op.between]:[from,to] } } });
  const total = rows.reduce((sum,r)=> sum+(r.total_biaya||0),0);
  res.json({ from, to, total_pendapatan: total, data: rows });
});

router.get('/peminjaman', async (req,res)=>{
  const { from, to } = req.query;
  const rows = await Peminjaman.findAll({ where:{ waktu_mulai:{ [Op.between]:[from,to] } } });
  res.json(rows);
});

module.exports = router;
