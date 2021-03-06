const express = require("express");
const cors = require("cors");
const classes = require("../classes");

const shortId = require("shortid");
const URL = "http://localhost:3000";

let router = express.Router();
const dataBase = new classes.DataBase();

(async function onLoad() {
	await dataBase.updateSelf();
	console.log("Urls currently in database:");
	console.log(dataBase.urls);
})();

router.use(cors());
// PUT /api/shorturl
router.put("/", async (req, res) => {
	// generate some kind of id for the new shortURL
	const shortUrlId = shortId.generate();
	const shortUrl = `${URL}/${shortUrlId}`;
	const longUrl = req.body.longUrl;

	const url = new classes.Url(longUrl, shortUrl, shortUrlId, 0);
	dataBase.addUrl(url);
	// error handling
	// return the URL object with short and long url
	return res.status(200).send(`${JSON.stringify(url, null, 4)}`);
});

module.exports = { router, dataBase };
