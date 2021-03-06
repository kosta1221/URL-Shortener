const dbRequests = require("./dbRequests");

class DataBase {
	constructor(urls = []) {
		this.urls = urls;
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
	}
}

module.exports = { DataBase, Url };
