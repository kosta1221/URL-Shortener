class DataBase {
	constructor(urls = [], userIds = []) {
		this.urls = urls;
		this.userIDs = userIds;
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
