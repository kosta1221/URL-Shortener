const axios = require("axios");

// This is Koren's default bin which is better for persistency because it always exists
const MY_BIN_ID_FOR_URLS = "default";

// using Koren's package of jsonbin-clone to get my relevant bin of urls
const getUrlsBin = async () => {
	try {
		const { data } = await axios({
			method: "GET",
			url: "http://localhost:3001/b/" + MY_BIN_ID_FOR_URLS,
			data: {},
		});
		// There are 2 layers of arrays in Koren's bins for some reason
		const urls = data.record[0];
		if (urls && Array.isArray(urls)) {
			return urls;
		}
	} catch (error) {
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
			url: "http://localhost:3001/b/" + MY_BIN_ID_FOR_URLS,
			data: JSON.stringify(dataBase.urls),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getUrlsBin, updateUrlsBin };
