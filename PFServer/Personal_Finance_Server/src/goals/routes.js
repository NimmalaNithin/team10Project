const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/goal", controller.addGoal);
router.get("/:id/progressgoals", controller.getProgressGoals);
router.get("/:id/completedgoals", controller.getCompletedGoals);
router.get("/:id/incompletedgoals", controller.getInCompletedGoals);

module.exports = router;
