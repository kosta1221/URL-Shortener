const dbRequests = require("./dbRequests");

class DataBase {
	constructor(urls = [], userIds = []) {
		this.urls = urls;
		this.userIds = userIds;
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
		//TODO add some kind of url validation

		this.urls.push(url);

		// persistent storage will be updated according to this database
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
