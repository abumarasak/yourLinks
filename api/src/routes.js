const express = require("express");
const router = express.Router();

// auth
const authRoutes = require("./domains/auth");
router.use("/auth", authRoutes);

module.exports = router;
