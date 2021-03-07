window.addEventListener("DOMContentLoaded", () => {
	const messageToUser = document.querySelector("#message-to-user");

	function createElementWithAttributes(tagName, attributes) {
		// create the element
		const element = document.createElement(tagName);

		// set attribute from params
		for (prop in attributes) {
			element.setAttribute(prop, attributes[prop]);
		}

		return element;
	}

	function appendChildren(elementToAppendTo, ...children) {
		children.forEach((child) => {
			if (typeof child === "string") {
				elementToAppendTo.appendChild(document.createTextNode(child));
			} else {
				elementToAppendTo.appendChild(child);
			}
		});
	}

	// Rendering short url that is currently in the input
	async function renderCurrentShortUrl() {
		messageToUser.innerText = "";

		const urlInput = document.querySelector("#url-input");
		const urlDisplay = document.querySelector("#url-display");

		if (document.querySelector("#short-url")) {
			document.querySelector("#short-url").remove();
		}

		console.log(urlInput);
		const longUrl = urlInput.value;

		let shortUrl;
		try {
			shortUrl = await makeUrlShort(longUrl);
		} catch (error) {
			console.log("received an error with message:");
			console.log(error.message);
			messageToUser.hidden = false;
			messageToUser.innerText = error.message;
			return;
		}

		console.log(shortUrl);
		const myUrl = createElementWithAttributes("a", {
			id: `short-url`,
			href: `${shortUrl}`,
			target: `_blank`,
		});

		appendChildren(myUrl, shortUrl);

		urlDisplay.appendChild(myUrl);
	}

	// function for showing the stats of the desired url on screen
	async function showStats(shortUrl = null) {
		messageToUser.innerText = "";

		const tdLongUrl = document.querySelector("#td-long-url");
		const tdShortUrl = document.querySelector("#td-short-url");
		const tdCreatedAt = document.querySelector("#td-created-at");
		const tdTimesClicked = document.querySelector("#td-times-clicked");

		const urlStatsInput = document.querySelector("#url-stats-input");
		let shortUrlToGetStatsFor;

		if (shortUrl === null) {
			shortUrlToGetStatsFor = urlStatsInput.value;
		} else {
			shortUrlToGetStatsFor = shortUrl;
		}
		console.log(shortUrl);
		console.log(shortUrlToGetStatsFor);

		let urlObject;
		try {
			urlObject = await getStatsForUrl(shortUrlToGetStatsFor);
		} catch (error) {
			console.log("received an error with message:");
			console.log(error.message);
			messageToUser.hidden = false;
			messageToUser.innerText = error.message;
			return;
		}

		console.log(urlObject);
		tdLongUrl.innerText = urlObject.long;
		tdShortUrl.innerText = urlObject.short;
		tdTimesClicked.innerText = urlObject.clickCount;
		tdCreatedAt.innerText = toMyDateForSmallerScreens(urlObject.creationDate);
	}

	document.querySelector("#url-input-button").addEventListener("click", () => {
		renderCurrentShortUrl();
		document.querySelector("#url-display-placeholder").style.display = "none";
	});

	document.querySelector("#show-stats-button").addEventListener("click", () => {
		showStats();
	});
});
