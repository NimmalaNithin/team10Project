const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/login", controller.login);
router.get("/userfirstname/:id", controller.getUserFirstName);
router.post("/signup", controller.registeruser);

module.exports = router;
