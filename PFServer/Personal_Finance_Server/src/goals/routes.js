const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/goal", controller.addGoal);
router.put("/goal", controller.updateGoal);
router.get("/:id/progressgoals", controller.getProgressGoals);
router.get("/:id/completedgoals", controller.getCompletedGoals);
router.get("/:id/incompletedgoals", controller.getInCompletedGoals);
router.delete("/:userid/goal/:id", controller.deleteGoal);

module.exports = router;
