const getRecentTransactionsByUserId =
  "SELECT id, TO_CHAR(datetime, 'YYYY-MM-DD HH:MI:SS') AS datetime ,description,type,amount FROM transactions WHERE userid=$1 ORDER BY datetime DESC LIMIT 10;";

const getAllTransactionsByUserId =
  "SELECT id, TO_CHAR(datetime, 'YYYY-MM-DD HH:MI:SS') AS datetime ,description,type,amount FROM transactions WHERE userid=$1 ORDER BY datetime DESC;";

const getCurrentmonthEISByUserId =
  "SELECT SUM(amount) AS monthlyeis FROM transactions WHERE EXTRACT(MONTH FROM datetime) = EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP) AND type=$1 AND userid=$2";

const getMonthlyEISByUserId =
  "SELECT EXTRACT(MONTH FROM datetime) AS month, SUM(amount) AS totaleis FROM transactions WHERE EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP) And userid=$1 AND type = $2 GROUP BY EXTRACT(MONTH FROM datetime) ORDER BY EXTRACT(MONTH FROM datetime)";

const addTransactionByUserId =
  "insert into transactions (description, amount, type, userid) values ($1,$2,$3,$4)";

const deleteTransactionByUserId =
  "DELETE FROM transactions WHERE id=$1 AND userid = $2";

const updateTransactionByUserId =
  "UPDATE transactions SET description = $1,amount = $2,type = $3,datetime = $4 WHERE userid = $5 AND id = $6";

module.exports = {
  getRecentTransactionsByUserId,
  getAllTransactionsByUserId,
  getCurrentmonthEISByUserId,
  getMonthlyEISByUserId,
  addTransactionByUserId,
  deleteTransactionByUserId,
  updateTransactionByUserId,
};
