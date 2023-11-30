const pool = require("../../dbconnection");
const queries = require("./queries");

const login = (req, res) => {
  const { email, password } = req.body;
  pool.query(queries.login, [email, password], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      res.status(200).send(results.rows);
    }
  });
};

const getUserFirstName = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getUserFirstNameByUserId, [id], (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const registeruser = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  pool.query(
    queries.registeruser,
    [firstname, lastname, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.status(200).json("user registered successfully");
      }
    }
  );
};

module.exports = {
  login,
  getUserFirstName,
  registeruser,
};
