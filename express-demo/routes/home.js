const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.render("index", { title: "Hello World", message: "I cantr imagine" });
});

module.exports = router;
