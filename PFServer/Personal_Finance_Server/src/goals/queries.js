const getActiveGoalsTotalPercentage =
  "SELECT SUM(percentageofsavings) AS totalpercentage FROM goals WHERE userid = $1 AND status = 'inprogress'";

const getActiveGoalsTotalPercentageForUpdate =
  "SELECT SUM(percentageofsavings) AS totalpercentage FROM goals WHERE userid = $1 AND status = 'inprogress' and id!=$2";

const addGoal =
  "insert into goals (userid, title, purpose, amount, goalPeriod, amountPerMonth, amountSaved, percentageOfSavings,status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

const updateGoal =
  "UPDATE goals SET title=$1, purpose=$2, amount=$3, goalPeriod=$4, amountPerMonth=$5, amountSaved=$6, percentageOfSavings=$7,status=$8 WHERE userid = $9 AND id = $10";

const getCompletedGoalsByUserId =
  "SELECT * FROM goals WHERE userid=$1 AND status = 'completed'";

const updateGoalStatus =
  "UPDATE goals SET status = 'completed' WHERE userid = $1 AND amountsaved >= amount";

const updateInCompleteGoalStatus =
  "UPDATE goals SET status = 'incomplete' WHERE userid = $1 AND status = 'inprogress' AND (DATE_TRUNC('MONTH', CURRENT_DATE) - DATE_TRUNC('MONTH', createdOn)) >= (goalperiod || ' months')::interval";

const updateAmountSaved =
  "UPDATE goals g SET amountsaved = COALESCE((SELECT (SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) - SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END)) * (g.percentageofsavings / 100.0) FROM transactions t WHERE t.userid = g.userid AND t.datetime >= date_trunc('month', g.createdon) AND t.datetime <= date_trunc('month', CURRENT_DATE)), 0) WHERE g.status='inprogress' AND g.userid = $1";

const updateAmountPerMonth =
  "UPDATE goals g SET amountpermonth = COALESCE((g.amount - g.amountsaved) / g.goalperiod, 0) WHERE g.status='inprogress' AND g.userid =$1";

const getProgressGoalsByUserId =
  "SELECT * FROM goals WHERE userid=$1 AND status = 'inprogress' ORDER BY createdon DESC";
const getInCompletedGoalsByUserId =
  "SELECT * FROM goals WHERE userid=$1 AND status = 'incomplete' ORDER BY createdon DESC";
const deleteGoalByUserId =
  "DELETE FROM goals WHERE id=$1 AND userid = $2 ORDER BY createdon DESC";

module.exports = {
  getActiveGoalsTotalPercentage,
  getActiveGoalsTotalPercentageForUpdate,
  addGoal,
  updateGoal,
  getCompletedGoalsByUserId,
  updateGoalStatus,
  updateInCompleteGoalStatus,
  updateAmountSaved,
  updateAmountPerMonth,
  getProgressGoalsByUserId,
  getInCompletedGoalsByUserId,
  deleteGoalByUserId,
};
