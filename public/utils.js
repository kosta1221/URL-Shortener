const URL = "http://localhost:3000";

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
