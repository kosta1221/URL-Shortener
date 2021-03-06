const request = require("supertest");
const { app } = require("../app");
const { dataBase } = require("../routes/shorturlRoutes");

jest.setTimeout(10000);

let validUrlResponseBody, shortIdInDataBase;

beforeAll(async (done) => {
	await dataBase.updateSelf();
	done();
});

describe("PUT Route to /api/shorturl", () => {
	const validLongUrl = "https://www.w3schools.com/jsref/jsref_obj_date.asp";

	it("Should put and return the new shortened url", async (done) => {
		const requestBody = { longUrl: validLongUrl };
		const response = await request(app).put(`/api/shorturl`).send(requestBody);

		shortIdInDataBase = response.body.shortUrlId;
		validUrlResponseBody = response.body;
		console.log(response.body);
		// Is the status code 200
		expect(response.status).toBe(200);

		// Is the response body structured like a url object
		expect(response.body.long).toBeDefined();
		expect(response.body.short).toBeDefined();
		expect(response.body.shortUrlId).toBeDefined();
		expect(response.body.clickCount).toBeGreaterThanOrEqual(0);
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

	it("should return the existing URL if it already exists in the database. ", async (done) => {
		const validLongUrlWhichAlreadyExists = validLongUrl;
		requestBody = { longUrl: validLongUrlWhichAlreadyExists };

		const response = await request(app).put("/api/shorturl/").send(requestBody);
		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual(validUrlResponseBody);
		done();
	});
});

describe("GET route to /:shorturl-id", () => {
	it("should redirect the user to his desired destination (long url)", async (done) => {
		const response = await request(app).get(`/${shortIdInDataBase}`);
		const { headers } = response;

		expect(response.status).toBe(302);
		expect(headers).toHaveProperty("location");
		done();
	});
});

describe("GET route to /api/statistic/:shorturl-id", () => {
	it("should be able to get stats for short-id", async (done) => {
		const response = await request(app).get(`/api/statistic/${shortIdInDataBase}`);

		// Is the status code 200
		expect(response.status).toBe(200);

		// Is the response body structured like a url object
		expect(response.body.long).toBeDefined();
		expect(response.body.short).toBeDefined();
		expect(response.body.shortUrlId).toBeDefined();
		expect(response.body.clickCount).toBeGreaterThanOrEqual(0);
		expect(response.body.creationDate).toBeGreaterThan(1000000000000);
		done();
	});

	it("should increment the amount of clicks for the relevant link when redirected", async (done) => {
		const response1 = await request(app).get(`/api/statistic/${shortIdInDataBase}`);
		const oldNumberOfCLicks = response1.body.clickCount;

		// Make a click
		await request(app).get(`/${shortIdInDataBase}`);

		const response2 = await request(app).get(`/api/statistic/${shortIdInDataBase}`);
		const newNumberOfCLicks = response2.body.clickCount;

		expect(newNumberOfCLicks).toBe(oldNumberOfCLicks + 1);
		done();
	});
});
