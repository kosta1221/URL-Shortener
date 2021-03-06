window.addEventListener("DOMContentLoaded", () => {
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
		const urlInput = document.querySelector("#url-input");
		console.log(urlInput);
		const longUrl = urlInput.value;
		const shortUrl = await makeUrlShort(longUrl);
		console.log(shortUrl);

		if (!shortUrl) {
			alert("Invalid URL");
			return;
		}
		const myUrl = createElementWithAttributes("a", {
			id: `short-url`,
			href: `${shortUrl}`,
			target: `_blank`,
		});

		appendChildren(myUrl, shortUrl);

		document.querySelector("#url-display").appendChild(myUrl);
	}

	document.querySelector("#url-input-button").addEventListener("click", () => {
		console.log("hi");
		renderCurrentShortUrl();
		document.querySelector("#url-display-placeholder").style.display = "none";
	});
});
