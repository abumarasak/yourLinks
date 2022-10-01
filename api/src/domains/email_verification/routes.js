const express = require("express");
const router = express.Router();
const { emailVerification } = require("./controller");

// email Verification
router.post("/", emailVerification);
module.exports = router;
