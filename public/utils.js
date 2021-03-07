const URL = window.location.origin;

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
