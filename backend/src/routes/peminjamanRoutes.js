const express = require("express");
const router = express.Router();

const {
  getPeminjaman,
  createPeminjaman,
  selesaiPeminjaman,
  deletePeminjaman,
} = require("../controllers/peminjamanController");

router.get("/", getPeminjaman);
router.post("/", createPeminjaman);
router.put("/selesai/:id", selesaiPeminjaman);
router.delete("/:id", deletePeminjaman);

module.exports = router;