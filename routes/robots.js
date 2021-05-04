const express = require("express");
const router = express.Router();
const {
  getRobots,
  addRobot,
  deleteRobot,
} = require("../controller/robotsController");

router.route("/").get(getRobots).post(addRobot).delete(deleteRobot);

module.exports = router;
