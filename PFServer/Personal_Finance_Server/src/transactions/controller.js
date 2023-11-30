const pool = require("../../dbconnection");
const queries = require("./queries");
const helper = require("./dataProcessing");

const getRecentTransactions = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getRecentTransactionsByUserId, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getAllTransactions = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAllTransactionsByUserId, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getCurrentMonthIncome = (req, res) => {
  const id = req.params.id;
  const type = "income";
  pool.query(
    queries.getCurrentmonthEISByUserId,
    [type, id],
    (error, results) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const getCurrentMonthExpense = (req, res) => {
  const id = req.params.id;
  const type = "expense";
  pool.query(
    queries.getCurrentmonthEISByUserId,
    [type, id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const getCurrentMonthSavings = async (req, res) => {
  const id = req.params.id;
  let type = "income";

  try {
    const incomesResult = await pool.query(queries.getCurrentmonthEISByUserId, [
      type,
      id,
    ]);
    type = "expense";
    const expenseResult = await pool.query(queries.getCurrentmonthEISByUserId, [
      type,
      id,
    ]);
    const savings =
      incomesResult.rows[0].monthlyeis - expenseResult.rows[0].monthlyeis;
    res.status(200).json(savings);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getMonthlyIncomes = (req, res) => {
  const id = req.params.id;
  const type = "income";
  pool.query(queries.getMonthlyEISByUserId, [id, type], (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      let data = helper.datapreprocess(results.rows);
      data = helper.preprocessMonth(data);
      res.status(200).json(data);
    }
  });
};

const getMonthlyExpenses = (req, res) => {
  const id = req.params.id;
  const type = "expense";
  pool.query(queries.getMonthlyEISByUserId, [id, type], (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      let data = helper.datapreprocess(results.rows);
      data = helper.preprocessMonth(data);
      res.status(200).json(data);
    }
  });
};

const getMonthlySavings = async (req, res) => {
  const id = req.params.id;
  let type = "income";
  try {
    const incomes = await pool.query(queries.getMonthlyEISByUserId, [id, type]);
    type = "expense";
    const expense = await pool.query(queries.getMonthlyEISByUserId, [id, type]);
    const incomeData = helper.datapreprocess(incomes.rows);
    const expenseData = helper.datapreprocess(expense.rows);
    let savingsData = helper.computeSavings(incomeData, expenseData);
    savingsData = helper.preprocessMonth(savingsData);
    res.status(200).json(savingsData);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const addTransaction = (req, res) => {
  const { description, amount, type, userid } = req.body;
  pool.query(
    queries.addTransactionByUserId,
    [description, amount, type, userid],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.status(200).json("Added Transaction");
      }
    }
  );
};

const deleteTransaction = (req, res) => {
  const userid = req.params.userid;
  const id = req.params.id;
  pool.query(
    queries.deleteTransactionByUserId,
    [id, userid],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.status(200).json("Transaction Deleted");
      }
    }
  );
};

const updateTransaction = (req, res) => {
  const { description, amount, type, userid, id } = req.body;
  const currentDatetime = new Date();
  const formattedDatetime = currentDatetime
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");
  pool.query(
    queries.updateTransactionByUserId,
    [description, amount, type, formattedDatetime, userid, id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.status(200).json("Transaction Updated");
      }
    }
  );
};

module.exports = {
  getRecentTransactions,
  getAllTransactions,
  getCurrentMonthIncome,
  getCurrentMonthExpense,
  getCurrentMonthSavings,
  getMonthlyIncomes,
  getMonthlyExpenses,
  getMonthlySavings,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
