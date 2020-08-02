import { app } from '../server/index';
const request = require('supertest')
const testObj = { test: 'test' }

describe('Test the Post Endpoints', () => {
    test('is it receive and handle post request on geo route correctly?', async () => {
        const res = await request(app).
            post('/geo')
            .send({ testObj })
        expect(res.statusCode).toEqual(200);
    })

    test('is it receive and handle post request on weather route correctly?', async () => {
        const res = await request(app).
            post('/weather')
            .send({ testObj })
        expect(res.statusCode).toEqual(200);
    })

    test('is it receive and handle post request on pix route correctly?', async () => {
        const res = await request(app).
            post('/pix')
            .send({ testObj })
        expect(res.statusCode).toEqual(200);
    })

})

describe("Test Get Endpoints", () => {
    test("'is it receive and response post request on geo route correctly?", async () => {
        const response = await request(app).get("/geo");
        expect(response.statusCode).toBe(200);
    });

    test("is it receive and response post request on weather route correctly?", async () => {
        const response = await request(app).get("/weather");
        expect(response.statusCode).toBe(200);
    });

    test("is it receive and response post request on pix route correctly?", async () => {
        const response = await request(app).get("/pix");
        expect(response.statusCode).toBe(200);
    });

    test("is it receive and response post request on country route correctly?", async () => {
        const response = await request(app).get("/country");
        expect(response.statusCode).toBe(200);
    });
});