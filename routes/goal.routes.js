const express = require('express');
const goalController = require('../controllers/goal.controller');
const router = express.Router();

router.post('/', goalController.createGoal);

router.get('/', goalController.getGoals);

router.get('/:goalId', goalController.getGoalById);

router.put('/:goalId', goalController.updateGoal);

router.delete('/:goalId', goalController.deleteGoal);

module.exports = router;