const events = require("events");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const goalsRoutes = require("./src/goals/routes");
const transactionsRoutes = require("./src/transactions/routes");
const usersRoutes = require("./src/users/routes");

const app = express();
const port = 3000;

const emitter = new events.EventEmitter();
emitter.setMaxListeners(100);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/goals", goalsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log("server running on port ", port);
});
