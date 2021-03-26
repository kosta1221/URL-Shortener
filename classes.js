const dbRequests = require("./dbRequests");
const URL = "http://localhost:3000";

class DataBase {
	constructor(urls = []) {
		this.urls = urls;
	}

	getUrlByShortUrl(shortUrlId) {
		// find the index of the url in the database with corresponding shortUrlId (if one exists!)
		const indexOfUrlInDataBase = this.urls.findIndex((url) => url.shortUrlId === shortUrlId);

		if (indexOfUrlInDataBase === -1) {
			throw new Error(`Url with short-id '${shortUrlId}' not found in database!`);
		}

		return this.urls[indexOfUrlInDataBase];
	}

	// a method for updating itself based on persistent storage
	async updateSelf() {
		const res = await dbRequests.getUrlsBin();
		this.urls = [...res];
	}

	// a method for adding a url to the database
	async addUrl(url) {
		if (!url) {
			throw new Error("Must pass in a url!");
		}

		try {
			this.urls.push(url);
			await this.updateBin();
		} catch (error) {
			console.log("received an error with message:");
			console.log(error.message);
		}
	}

	// persistent storage will be updated according to this database
	async updateBin() {
		await dbRequests.updateUrlsBin(this);
	}
}

class Url {
	constructor(long, short, shortUrlId, clickCount) {
		this.long = long;
		this.short = short;
		this.shortUrlId = shortUrlId;
		this.clickCount = clickCount;
		this.creationDate = Date.now();
	}
}

module.exports = { DataBase, Url };
