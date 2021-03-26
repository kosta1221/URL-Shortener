const express = require("express");
const cors = require("cors");
const shorturlRoutes = require("./shorturlRoutes");

let router = express.Router();

router.use(cors());

// GET /api/statistic/:shorturl-id
router.get("/:shorturlid", async (req, res) => {
	const shortUrlId = req.params.shorturlid;
	let urlToReturn;
	try {
		urlToReturn = shorturlRoutes.dataBase.getUrlByShortUrl(shortUrlId);
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
		return res.status(404).send(`${error.message}`);
	}
	return res.status(200).json(urlToReturn);
});

module.exports = { router };
