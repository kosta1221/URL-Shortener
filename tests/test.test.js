const request = require("supertest");
const { app } = require("../app");

describe("PUT Route", () => {
	const validLongUrl = "https://www.w3schools.com/jsref/jsref_obj_date.asp";

	it("Should put and return the new shortened url", async () => {
		const requestBody = { longUrl: validLongUrl };
		const response = await request(app).put(`/api/shorturl`).send(requestBody);

		// Is the status code 200
		expect(response.status).toBe(200);

		// Is the response body structured like a url object
		expect(response.body.long).toBeDefined();
		expect(response.body.short).toBeDefined();
		expect(response.body.shortUrlId).toBeDefined();
		expect(response.body.clickCount).toBeDefined();
		expect(response.body.creationDate).toBeGreaterThan(1000000000000);
	});
});
