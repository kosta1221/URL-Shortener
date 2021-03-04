const express = require("express");
const cors = require("cors");
const app = express();

const shortener = require("./shortener");

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use(shortener.router);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
