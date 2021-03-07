const URL = "https://URL-Shortener.kostakirov.repl.co";

async function makeUrlShort(longUrl) {
	try {
		const { data } = await axios({
			method: "PUT",
			url: `${URL}/api/shorturl`,
			data: JSON.stringify({ longUrl }),
			headers: { "Content-Type": "application/json" },
		});
		return data.short;
	} catch (error) {
		console.log(error.message);
		throw new Error(error.response.data);
	}
}

async function getStatsForUrl(shortUrlId) {
	try {
		const { data } = await axios({
			method: "GET",
			url: `${URL}/api/statistic/${shortUrlId}`,
			headers: { "Content-Type": "application/json" },
		});
		return data;
	} catch (error) {
		console.log(error.message);
		throw new Error(error.response.data);
	}
}

// A function for padding numbers to 2 digits.
function twoDigits(number) {
	if (0 <= number && number < 10) {
		return "0" + number.toString();
	}
	return number.toString();
}

/* A function for converting date in MS to my mySQL format strings (local time) */
function toMyDateForSmallerScreens(dateInMS) {
	const dateObject = new Date(dateInMS);

	return (
		twoDigits(1 + dateObject.getMonth()) +
		"/" +
		twoDigits(dateObject.getDate()) +
		" " +
		twoDigits(dateObject.getHours()) +
		":" +
		twoDigits(dateObject.getMinutes())
	);
}
