const GoalController = require('../../controllers/goal.controller');
const GoalModel = require('../../model/goal.model');
const httpMocks = require('node-mocks-http');
const newGoal = require('../mock-data/new-goal.json');
const allGoals = require('../mock-data/all-goals.json');

const goalId = '5eb9f1d87ed4d639701bb4be';
let req, res, next;

// GoalModel.create = jest.fn();
// GoalModel.find = jest.fn();
// GoalModel.findById = jest.fn();
// GoalModel.findByIdAndUpdate = jest.fn();
// GoalModel.findByIdAndDelete = jest.fn();
jest.mock('../../model/goal.model');

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('GoalController.getGoals', () => {
  it('should have a getGoals function', () => {
    expect(typeof GoalController.getGoals).toBe('function');
  });

  it('should call GoalModel.find({})', async () => {
    await GoalController.getGoals(req, res, next);
    expect(GoalModel.find).toHaveBeenCalledWith({});
  });

  it('should return response with status 200 and all goals', async () => {
    GoalModel.find.mockReturnValue(allGoals);
    await GoalController.getGoals(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allGoals);
  });

  it('should handle errors in getGoals', async () => {
    const errorMessage = { message: 'Error finding' };
    const rejectedPromise = Promise.reject(errorMessage);
    GoalModel.find.mockReturnValue(rejectedPromise);
    await GoalController.getGoals(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('GoalController.getGoalById', () => {
  it('should have a getGoalById', () => {
    expect(typeof GoalController.getGoalById).toBe('function');
  });

  it('should call GoalModel.findById with route parameters', async () => {
    req.params.goalId = goalId;
    await GoalController.getGoalById(req, res, next);
    expect(GoalModel.findById).toBeCalledWith(goalId);
  });

  it('should return json body and response code 200', async () => {
    GoalModel.findById.mockReturnValue(newGoal);
    await GoalController.getGoalById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newGoal);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should do error handling', async () => {
    const errorMessage = { message: 'error finding goalModel' };
    const rejectedPromise = Promise.reject(errorMessage);
    GoalModel.findById.mockReturnValue(rejectedPromise);
    await GoalController.getGoalById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});


describe('GoalController.createGoal', () => {
  beforeEach(() => {
    req.body = newGoal;
  });

  it('should have a createGoal function', () => {
    expect(typeof GoalController.createGoal).toBe('function');
  });

  it('should call GoalModel.create', () => {
    GoalController.createGoal(req, res, next);
    expect(GoalModel.create).toBeCalledWith(newGoal);
  });

  it('should return 201 response code', async () => {
    await GoalController.createGoal(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    GoalModel.create.mockReturnValue(newGoal);
    await GoalController.createGoal(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newGoal);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Complete property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    GoalModel.create.mockReturnValue(rejectedPromise);
    await GoalController.createGoal(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  describe('GoalController.updateGoal', () => {
    it('should have a updateGoal function', () => {
      expect(typeof GoalController.updateGoal).toBe('function');
    });

    it('should update with GoalModel.findByIdAndUpdate', async () => {
      req.params.goalId = goalId;
      req.body = newGoal;
      await GoalController.updateGoal(req, res, next);
      expect(GoalModel.findByIdAndUpdate).toHaveBeenCalledWith(goalId, newGoal, {
        new: true,
        useFindAndModify: false
      });
    });

    it('should return a response with json data and http code 200', async () => {
      req.params.goalId = goalId;
      req.body = newGoal;
      GoalModel.findByIdAndUpdate.mockReturnValue(newGoal);
      await GoalController.updateGoal(req, res, next);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newGoal);
    });

    it('should handle errors', async () => {
      const errorMessage = { message: 'Error' };
      const rejectedPromise = Promise.reject(errorMessage);
      GoalModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
      await GoalController.updateGoal(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('GoalController.deleteGoal', () => {
    it('should have a deleteGoal function', () => {
      expect(typeof GoalController.deleteGoal).toBe('function');
    });

    it('should call findByIdAndDelete', async () => {
      req.params.goalId = goalId;
      await GoalController.deleteGoal(req, res, next);
      expect(GoalModel.findByIdAndDelete).toBeCalledWith(goalId);
    });

    it('should return 200 OK and deleted goalmodel', async () => {
      GoalModel.findByIdAndDelete.mockReturnValue(newGoal);
      await GoalController.deleteGoal(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newGoal);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
      const errorMessage = { message: 'Error deleting' };
      const rejectedPromise = Promise.reject(errorMessage);
      GoalModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
      await GoalController.deleteGoal(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should handle 404', async () => {
      GoalModel.findByIdAndDelete.mockReturnValue(null);
      await GoalController.deleteGoal(req, res, next);
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });
});