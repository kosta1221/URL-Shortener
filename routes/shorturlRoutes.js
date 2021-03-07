const express = require("express");
const cors = require("cors");
const classes = require("../classes");
const validUrl = require("valid-url");

const shortId = require("shortid");
const URL = "https://URL-Shortener.kostakirov.repl.co";

let router = express.Router();
const dataBase = new classes.DataBase();

(async function onLoad() {
	try {
		await dataBase.updateSelf();
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
	}
	console.log("Urls currently in database(on load):");
	console.log(dataBase.urls);
})();

router.use(cors());
// PUT /api/shorturl
router.put("/", async (req, res) => {
	// generate some kind of id for the new shortURL
	const shortUrlId = shortId.generate();
	const shortUrl = `${URL}/${shortUrlId}`;
	const longUrl = req.body.longUrl;

	// Check if the long url typed into input already exists in the database
	const urlAlreadyExistsInDatabase = dataBase.urls.find((url) => url.long === `${longUrl}`);
	if (urlAlreadyExistsInDatabase) {
		console.log("returned url that already exists");
		return res.status(200).json(urlAlreadyExistsInDatabase);
	}

	// Error Handling
	// Cannot add a URL with an invalid format
	if (!validUrl.isWebUri(longUrl)) {
		console.log(`URL '${longUrl}' is invalid. Please enter a valid url.`);
		return res.status(400).send(`URL '${longUrl}' is invalid. Please enter a valid url.`);
	}

	// create a new URL object with with short and long url, then add it to database and then return the URL object
	const url = new classes.Url(longUrl, shortUrl, shortUrlId, 0);

	try {
		dataBase.addUrl(url);
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
		return res.status(500).json(`Internal server error. message: ${error.message}`);
	}

	return res.status(200).json(url);
});

module.exports = { router, dataBase };
