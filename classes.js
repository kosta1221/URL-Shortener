const dbRequests = require("./dbRequests");

class DataBase {
	constructor(urls = [], userIds = []) {
		this.urls = urls;
		this.userIDs = userIds;
	}

	// a method for updating itself based on persistent storage
	updateSelf() {
		dbRequests.getUrlsBin();
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
