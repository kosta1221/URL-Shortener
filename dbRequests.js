const axios = require("axios");

// This is a bin I've created using postman to put my urls there
const MY_BIN_ID_FOR_URLS = "455547f0-a066-414d-a091-13de6cd78819";

// using koren's package of jsonbin-clone to get my relevant bin of urls
const getUrlsBin = async () => {
	try {
		const { data } = await axios({
			method: "GET",
			url: "http://localhost:3001/b/" + MY_BIN_ID_FOR_URLS,
			data: {},
		});
		const urls = data.record;
		if (urls && Array.isArray(urls)) {
			return urls;
		}
	} catch (error) {
		console.log(error);
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
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getUrlsBin, updateUrlsBin };
