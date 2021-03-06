require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const classes = require("./classes");

const shorturlRoutes = require("./routes/shorturlRoutes");

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use("/api/shorturl", shorturlRoutes.router);

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
	console.log(indexOfUrlInDataBase);

	const longUrl = urlsInDatabase[indexOfUrlInDataBase].long;

	// redirect the response to the longURL of that url
	try {
		res.redirect(longUrl);
	} catch (error) {
		return res.status(500).json("Internal server error");
	}
});

module.exports = { app };
