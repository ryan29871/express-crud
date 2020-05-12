const request = require('supertest');
const app = require('../../app');
const newGoal = require('../mock-data/new-goal.json');

const endpointUrl = '/goals/';
const rootEndpointUrl = '/';
const nonExistingGoalId = '5eb9f1abce0bb571a89b81f8';
const testData = {
  title: 'Make integration test for PUT',
  description: 'Write the test',
  complete: true
};

let firstGoal, newGoalId;

describe(endpointUrl, () => {

  it('GET ' + endpointUrl, async () => {
    const response = await request(app).get(rootEndpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    expect(response.body[0].complete).toBeDefined();
    firstGoal = response.body[0];
  });

  it('GET by Id ' + endpointUrl + ':goalId', async () => {
    const response = await request(app).get(endpointUrl + firstGoal._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstGoal.title);
    expect(response.body.description).toBe(firstGoal.description);
    expect(response.body.complete).toBe(firstGoal.complete);
  });

  it(`GET goal by id doesn't exist` + endpointUrl + `:goalId`, async () => {
    const response = await request(app).get(
      endpointUrl + nonExistingGoalId
    );
    expect(response.statusCode).toBe(404);
  });

  it('POST ' + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newGoal);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newGoal.title);
    expect(response.body.description).toBe(newGoal.description);
    expect(response.body.complete).toBe(newGoal.complete);
    newGoalId = response.body._id;
  });

  it('should return error 500 on malformed data with POST' + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: 'Missing complete property' });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Goal validation failed: complete: Path `complete` is required., description: Path `description` is required.'
      });
    }
  );

  it('PUT ' + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + newGoalId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.description).toBe(testData.description);
    expect(res.body.complete).toBe(testData.complete);
  });

  it('should return 404 on PUT ' + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + nonExistingGoalId)
      .send(testData);
    expect(res.statusCode).toBe(404);
  });

  it('HTTP DELETE', async () => {
    const res = await request(app)
      .delete(endpointUrl + newGoalId)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.description).toBe(testData.description);
    expect(res.body.complete).toBe(testData.complete);
  });

  it('HTTP DELETE 404', async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingGoalId)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
