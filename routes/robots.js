const express = require("express");
const router = express.Router();
const {
  getRobots,
  addRobot,
  deleteRobot,
  rotateLeft,
  rotateRight,
  move,
} = require("../controller/robotsController");

router.route("/").get(getRobots).post(addRobot).delete(deleteRobot);
router.route("/left").post(rotateLeft);
router.route("/right").post(rotateRight);
router.route("/move").post(move);
module.exports = router;
