const express = require("express");
const cors = require("cors");
const app = express();

const shorturlRoutes = require("./routes/shorturlRoutes");
const statisticRoutes = require("./routes/statisticRoutes");

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use("/api/shorturl", shorturlRoutes.router);
app.use("/api/statistic", statisticRoutes.router);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// GET requests to /:shorturl will redirect the user to the corresponding long url if one is stored in the database
app.get("/:shorturl", async (req, res) => {
	const shortUrlId = req.params.shorturl;
	// get the database with urls in it
	const urlsInDatabase = shorturlRoutes.dataBase.urls;
	if (!urlsInDatabase) {
		return res.status(400).send("Database empty!");
	}

	// find url in the database with corresponding shortURL (if one exists!)
	const indexOfUrlInDataBase = urlsInDatabase.findIndex((url) => url.shortUrlId === shortUrlId);
	if (indexOfUrlInDataBase === -1) {
		return res.status(404).send(`Url with short-id ${shortUrlId} not found in database!`);
	}

	const desiredUrl = urlsInDatabase[indexOfUrlInDataBase];

	// redirect the response to the longURL of that url
	try {
		desiredUrl.clickCount++;
		await shorturlRoutes.dataBase.updateBin();
		console.log(`short-link ${desiredUrl.short} clicked ${desiredUrl.clickCount} times!`);
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
		return res.status(500).json(`Internal server error. message: ${error.message}`);
	}

	res.redirect(desiredUrl.long);
});

module.exports = { app };
