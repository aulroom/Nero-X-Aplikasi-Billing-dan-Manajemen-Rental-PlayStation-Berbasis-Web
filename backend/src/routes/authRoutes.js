const express = require("express");
const router = express.Router();

// User dummy
const USERS = [
  {
    username: "admin",
    password: "rahasia",
    role: "admin",
  },
  {
    username: "pelanggan",
    password: "123456",
    role: "pelanggan",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Username atau password salah",
    });
  }

  res.json({
    token: "dummy-jwt-token",
    username: user.username,
    role: user.role,
  });
});

router.post("/logout", (req, res) => {
  res.json({
    message: "Logout berhasil",
  });
});

module.exports = router;