const axios = require("axios");
require("dotenv").config({ path: __dirname + "/sample.env" });

// This is Koren's default bin which is better for persistency because it always exists. If testing should use the test bin which is also one built in to his package.
const MY_BIN_ID_FOR_URLS = process.env.DB_URI || "default";
console.log(process.env.DB_URI);
console.log(MY_BIN_ID_FOR_URLS);

// using Koren's package of jsonbin-clone to get my relevant bin of urls
const getUrlsBin = async () => {
	try {
		const { data } = await axios({
			method: "GET",
			url: "window.location.origin" + MY_BIN_ID_FOR_URLS,
			data: {},
		});
		// There are 2 layers of arrays in Koren's bins for some reason
		const urls = data.record[0];
		if (urls && Array.isArray(urls)) {
			return urls;
		}
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
	}
};

// update my urls bin according to a database
const updateUrlsBin = async (dataBase) => {
	if (!dataBase) {
		throw new Error("Must pass in a database");
	}

	try {
		let response = await axios({
			method: "PUT",
			url: "window.location.origin" + MY_BIN_ID_FOR_URLS,
			data: JSON.stringify(dataBase.urls),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.log("received an error with message:");
		console.log(error.message);
	}
};

module.exports = { getUrlsBin, updateUrlsBin };
