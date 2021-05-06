const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
var isEmpty = require("lodash.isempty");

exports.getRobots = (req, res, next) => {
  try {
    if (isEmpty(req.body.name)) {
      const error = new Error("INVALID REQUEST");
      error.status = 400;
      error.stack = error;
      next(error);
    } else {
      const robots = db.get("robots").value();
      res.status(200).send(robots);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addRobot = (req, res) => {
  try {
    if (isEmpty(req.body.name)) {
      const error = new Error("INVALID REQUEST");
      error.status = 400;
      error.stack = error;
      next(error);
    } else {
      //get body
      const robots = req.body;
      // get the db
      db.get("robots")
        //push the record
        .push(robots)
        //grab the last element
        .last()
        // and assign a id via a Date number
        .assign({ id: Date.now().toString() })
        //write it
        .write();
    }
    // send back the new record
    res.status(201).send(robots);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteRobot = (req, res) => {
  try {
    if (isEmpty(req.body.name)) {
      const error = new Error("INVALID REQUEST");
      error.status = 400;
      error.stack = error;
      next(error);
    } else {
      // delete a record
      const inputID = req.body.id;
      db.get("robots").remove({ id: inputID }).write();
      res.status(200).send("Robot is gone!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.rotateLeft = (req, res) => {
  const robotID = req.body.id;

  const headingCheck = (heading) => {
    switch (heading) {
      case "north":
        return (heading = "west");

      case "west":
        return (heading = "south");

      case "south":
        return (heading = "east");

      case "east":
        return (heading = "north");
    }
  };
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.id === robotID);
  console.log(robot);

  const newHeading = headingCheck(robot.heading);

  db.get("robots")
    .find({ id: robotID })
    .assign({ heading: newHeading })
    .write();

  res.send(robot);
};

exports.rotateRight = (req, res) => {
  const robotID = req.body.id;
  // const heading = req.body.heading;
  // console.log(heading);
  // const robot = db.get("robots").find({ id: robotID }).value();
  const headingCheck = (heading) => {
    switch (heading) {
      case "north":
        return (heading = "east");

      case "east":
        return (heading = "south");

      case "south":
        return (heading = "west");

      case "west":
        return (heading = "north");
    }
  };
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.id === robotID);
  console.log(robot);

  const newHeading = headingCheck(robot.heading);

  db.get("robots")
    .find({ id: robotID })
    .assign({ heading: newHeading })
    .write();

  res.send(robot);
};

exports.move = (req, res) => {
  let robotName = req.body.name;
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.name === robotName);
  let PosX = Number(robot.PosX);
  let PosY = Number(robot.PosY);
  switch (robot.heading) {
    case "north":
      db.get("robots")
        .find({ name: robotName })
        .assign({ PosY: PosY + 1 })
        .write();
      break;
    case "east":
      db.get("robots")
        .find({ name: robotName })
        .assign({ PosX: PosX + 1 })
        .write();
      break;
    case "south":
      db.get("robots")
        .find({ name: robotName })
        .assign({ PosY: PosY - 1 })
        .write();
      break;
    case "west":
      db.get("robots")
        .find({ name: robotName })
        .assign({ PosX: PosX - 1 })
        .write();
      break;
    default:
      null;
  }
  res.status(200).send(robot);
};
