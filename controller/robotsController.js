const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRobots = (req, res) => {
  const robots = db.get("robots").value();
  res.status(200).send(robots);
};

exports.addRobot = (req, res) => {
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

  // send back the new record
  res.status(201).send(robots);
};

exports.deleteRobot = (req, res) => {
  // delete a record
  const inputID = req.body.id;
  db.get("robots").remove({ id: inputID }).write();
  res.status(200).send("Robot is gone!");
};
