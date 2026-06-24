const express = require("express");
const router = express.Router();

const {
  getRuangan,
  createRuangan,
  updateRuangan,
  deleteRuangan,
} = require("../controllers/ruanganController");

// GET
router.get("/", getRuangan);

// POST
router.post("/", createRuangan);

// PUT
router.put("/:id", updateRuangan);

// DELETE
router.delete("/:id", deleteRuangan);

module.exports = router;