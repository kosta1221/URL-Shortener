const express = require("express");
const cors = require("cors");
const classes = require("../classes");

let router = express.Router();

router.use(cors());

// PUT /api/shorturl
router.put("/", async (req, res) => {
	// error handling
	// generate some kind of id for the new shortURL
	// return the URL object with short and long url
});

module.exports = { router };
