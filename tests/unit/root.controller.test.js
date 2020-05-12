const RootController = require('../../controllers/root.controller');
const httpMocks = require('node-mocks-http');

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('RootController.getRoot', () => {
  it('should have a getRoot function', () => {
    expect(typeof RootController.getRoot).toBe('function');
  });

  it('should return response with status 200 and data', () => {
    RootController.getRoot(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ data: 'Welcome to my CRUD app!' });
  });

});