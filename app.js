require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const shorturlRoutes = require("./routes/shorturlRoutes");

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use("/api/shorturl", shorturlRoutes.router);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
