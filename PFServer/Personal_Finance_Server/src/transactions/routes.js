const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/:id/recenttransactions", controller.getRecentTransactions);
router.get("/:id/alltransactions", controller.getAllTransactions);
router.get("/:id/currentmonthincome", controller.getCurrentMonthIncome);
router.get("/:id/currentmonthexpense", controller.getCurrentMonthExpense);
router.get("/:id/currentmonthsavings", controller.getCurrentMonthSavings);
router.get("/:id/monthlyincomes", controller.getMonthlyIncomes);
router.get("/:id/monthlyexpenses", controller.getMonthlyExpenses);
router.get("/:id/monthlysavings", controller.getMonthlySavings);
router.post("/transaction", controller.addTransaction);
router.delete("/:userid/transaction/:id", controller.deleteTransaction);
router.put("/transaction", controller.updateTransaction);

module.exports = router;
