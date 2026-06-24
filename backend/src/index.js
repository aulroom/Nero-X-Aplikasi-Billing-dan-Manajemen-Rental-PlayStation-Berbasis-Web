const express = require("express");
const cors = require("cors");
const sequelize = require("../config/db");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ruangan", require("./routes/ruanganRoutes"));
app.use("/api/barang", require("./routes/barangRoutes"));
app.use("/api/peminjaman", require("./routes/peminjamanRoutes"));

// TEST API
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

// DATABASE
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.log("❌ DB error:", err));

// SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});