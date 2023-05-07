const mongodb = require("../db/mongoDB").mongoDb();
const mongoDB = require("mongodb").ObjectId;
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
        res.status(404).send("<h4>Documents not found</h4>");
      }
      database.close();
    });
};


// retrieve a single document from a collection
const singleDoc = async (req, res, next) => {
  const objectId = new mongoDB(req.params.id);
  // const ObjectId = require('mongodb').ObjectId;
  const database = await mongodb;
  database
    .db()
    .collection("contacts")
    .find({ _id: objectId})
    // .find({_id: new ObjectId(req.params.id)});
    .toArray()
    .then((doc) => {
      res.setHeader("Content-Type", "application/json");
      // checks if the connection was successful
      if(database) {
        res.status(200).json(doc);
      } else {
        res.status(404).send("<h4>Document not found</h4>");
      }
      database.close();
    });

 
};

module.exports = { allDoc, singleDoc };
