const express = require("express");
const cors = require("cors");
const classes = require("../classes");

let router = express.Router();

router.use(cors());

// PUT /api/shorturl/

module.exports = { router };
