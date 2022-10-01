const express = require("express");
const router = express.Router();
const { signin, signup } = require("./controller");
const upload = require("../../middleware/upload_middleware");

// signup
router.post("/signup", signup);
// signin
router.post("/signin", signin);
// signout
// router.post("/signout", signout);

module.exports = router;
