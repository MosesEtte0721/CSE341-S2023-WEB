const mongodb = require("../db/mongoDB").mongoDb();
// const express = require("express");
// const app = express();

// app.use(express.json)

const allDoc = async (req, res) => {
  const database = await mongodb; // mongodb connection
  // finds collection from the profile database and converts the data to an array
  database
    .db()
    .collection("contacts")
    .find({})
    .toArray()
    .then((list) => {
      // sets the data type of the data retrieved

      res.setHeader("Content-Type", "application/json");
      // send the successful status code and converts the data to JSON
      if (database) {
        res.status(200).json(list);
      } else {
        res.status(404).send({ message: "Document(s) not found" });
      }
      database.close();
    });
};

// const specificDoc = async (req, res, next) => {
//     const database = await connect.db();
//     const collection = await database.collection("contacts").findOne();

//     next();
// }

module.exports = { allDoc };
