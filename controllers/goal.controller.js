const GoalModel = require('../model/goal.model');

exports.createGoal = async (req, res, next) => {
  try {
    const createdModel = await GoalModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error)
  }
};

exports.getGoals = async (req, res, next) => {
  try {
    const allGoals = await GoalModel.find({});
    res.status(200).json(allGoals);
  } catch (error) {
    next(error);
  }
};

exports.getGoalById = async (req, res, next) => {
  try {
    const goalModel = await GoalModel.findById(req.params.goalId);
    if (goalModel) {
      res.status(200).json(goalModel);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const updatedGoal = await GoalModel.findByIdAndUpdate(
      req.params.goalId,
      req.body,
      {
        new: true,
        useFindAndModify: false
      }
    );
    if (updatedGoal) {
      res.status(200).json(updatedGoal);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const deletedGoal = await GoalModel.findByIdAndDelete(req.params.goalId);
    if (deletedGoal) {
      res.status(200).json(deletedGoal);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};