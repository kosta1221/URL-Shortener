const request = require("supertest");
const { app } = require("../app");

jest.setTimeout(10000);

describe("PUT Route", () => {
	const validLongUrl = "https://www.w3schools.com/jsref/jsref_obj_date.asp";

	it("Should put and return the new shortened url", async (done) => {
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
		done();
	});

	it("should respond with an error upon recieving an invalid URL", async (done) => {
		requestBody = {
			longUrl: "I'm so tired, fuck",
		};
		const response = await request(app).put("/api/shorturl/").send(requestBody);
		expect(response.status).toBe(400);
		expect(response.text).toBe(`URL 'I'm so tired, fuck' is invalid. Please enter a valid url.`);
		done();
	});
});
