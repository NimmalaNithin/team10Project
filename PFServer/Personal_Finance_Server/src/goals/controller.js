const pool = require("../../dbconnection");
const queries = require("./queries");

const addGoal = async (req, res) => {
  const {
    userid,
    title,
    purpose,
    amount,
    goalPeriod,
    amountSaved,
    percentageOfSavings,
  } = req.body;

  const amountPerMonth = amount / goalPeriod;
  const status = "inprogress";
  try {
    let results = await pool.query(queries.getActiveGoalsTotalPercentage, [
      userid,
    ]);
    let totalpercentage = results.rows[0].totalpercentage;
    if (!totalpercentage) {
      totalpercentage = 0;
    }
    if (parseInt(totalpercentage) + parseInt(percentageOfSavings) < 100) {
      results = await pool.query(queries.addGoal, [
        userid,
        title,
        purpose,
        amount,
        goalPeriod,
        amountPerMonth,
        amountSaved,
        percentageOfSavings,
        status,
      ]);

      res.status(200).json("Goal Added");
    } else {
      res.status(500).json("Inadequate savings percentage remains");
    }
    // response = pool.query(queries.addGoal,)
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const updateGoal = async (req, res) => {
  const {
    id,
    userid,
    title,
    purpose,
    amount,
    goalPeriod,
    amountSaved,
    percentageOfSavings,
  } = req.body;

  const amountPerMonth = amount / goalPeriod;
  const status = "inprogress";
  try {
    let results = await pool.query(
      queries.getActiveGoalsTotalPercentageForUpdate,
      [userid, id]
    );
    let totalpercentage = results.rows[0].totalpercentage;
    if (!totalpercentage) {
      totalpercentage = 0;
    }

    if (parseInt(totalpercentage) + parseInt(percentageOfSavings) <= 100) {
      results = await pool.query(queries.updateGoal, [
        title,
        purpose,
        amount,
        goalPeriod,
        amountPerMonth,
        amountSaved,
        percentageOfSavings,
        status,
        userid,
        id,
      ]);

      res.status(200).json("Goal Added");
    } else {
      res.status(500).send("Inadequate savings percentage remains");
    }
    // response = pool.query(queries.addGoal,)
  } catch (error) {
    console.log(error.response.message);
    res.status(404).send(error);
  }
};

const getCompletedGoals = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getCompletedGoalsByUserId, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      const data = results.rows;
      data.forEach((row) => {
        row.createdon = row.createdon.toLocaleDateString();
      });
      res.status(200).json(data);
    }
  });
};

const getProgressGoals = async (req, res) => {
  const id = req.params.id;
  try {
    var result = await pool.query(queries.updateGoalStatus, [id]);

    result = await pool.query(queries.updateInCompleteGoalStatus, [id]);

    result = await pool.query(queries.updateAmountSaved, [id]);

    result = await pool.query(queries.updateAmountSaved, [id]);

    result = await pool.query(queries.updateAmountPerMonth, [id]);

    result = await pool.query(queries.updateGoalStatus, [id]);

    result = await pool.query(queries.getProgressGoalsByUserId, [id]);

    const data = result.rows;
    data.forEach((row) => {
      row.createdon = row.createdon.toLocaleDateString();
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getInCompletedGoals = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getInCompletedGoalsByUserId, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      const data = results.rows;
      data.forEach((row) => {
        row.createdon = row.createdon.toLocaleDateString();
      });
      res.status(200).json(data);
    }
  });
};

const deleteGoal = (req, res) => {
  const userid = req.params.userid;
  const id = req.params.id;
  pool.query(queries.deleteGoalByUserId, [id, userid], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).json("Goal Deleted");
    }
  });
};

module.exports = {
  addGoal,
  updateGoal,
  getCompletedGoals,
  getProgressGoals,
  getInCompletedGoals,
  deleteGoal,
};
