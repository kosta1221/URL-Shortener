const dbRequests = require("./dbRequests");

class DataBase {
	constructor(urls = [], userIds = []) {
		this.urls = urls;
		this.userIds = userIds;
	}

	// a method for updating itself based on persistent storage
	updateSelf() {
		dbRequests.getUrlsBin();
	}

	// a method for adding a url to the database
	addUrl(url) {
		if (!url) {
			throw new Error("Must pass in a url!");
		}
		//TODO add some kind of url validation

		this.urls.push(url);

		// persistent storage will be updated according to this database
		dbRequests.updateUrlsBin(this);
	}
}

class Url {
	constructor(long, short, clickCount) {
		this.long = long;
		this.short = short;
		this.clickCount = clickCount;
	}
}

module.exports = { DataBase, Url };
