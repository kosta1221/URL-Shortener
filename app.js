require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const classes = require("./classes");

const shorturlRoutes = require("./routes/shorturlRoutes");

const dataBase = new classes.DataBase();
dataBase.updateSelf();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use("/api/shorturl", shorturlRoutes.router);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// GET requests to /:shorturl will redirect the user to the corresponding long url if one is stored in the database
app.get("/:shorturl", async (req, res) => {
	let shorturl = req.params.shortUrl;
	// get the json with urls in it
	// find url in the database with corresponding shortURL (if one exists!)
	// redirect the response to the longURL of that url
});

module.exports = app;
