const mongodb = require("../db/mongoDB").mongoDb();
const mongoDB = require("mongodb").ObjectId;


const allDoc = async (req, res, next) => {
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
      // database.close();
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
        // console.log("This is a doucment from a collection")
        res.status(200).json(doc);
      } else {
        res.status(404).send("<h4>Document not found</h4>");
      }
      // database.close();
    });


};

// creates a document in mongoDB database
const createContact = async (req, res)=> {

  const contact = {

    first_name: req.body.first_name,

    last_name: req.body.last_name,

    favourite_colour: req.body.favourite_colour,

    birth_day: req.body.birth_day,
    email: req.body.email
  }
  console.log(contact);

  const database = await mongodb;
   const data = await database.db().collection("contacts").insertOne(contact);
   console.log(data);
  
  if(data.acknowledged) {
    console.log(`A document was inserted with the _id: ${data.insertedId}`);
    res.status(201).json(data)
  } 
  else {
    console.log("Failed! Document not inserted")
    res.status(500).json(data.error || "An error occurred while creating the document")
    
  }

}

const updateContact = async (req, res)=> {

  const contact = {
    firs_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    favourite_colour: req.body.favourite_colour,
    birth_day: req.body.birth_day

  }
  const objectId = new mongoDB(req.params.id)
  const database = await mongodb;
  const connect = await database.db().collection("contacts").replaceOne({_id: objectId}, contact);
  res.setHeader("Content-Type", "application/json")
  if(connect.modifiedCount > 0) {
    res.status(204).send(connect);
  } else {
    res.status(500).json(connect.error || "error occurred while updating the document" )
  }
}

const deleteContact = async (req, res) => {
  const objectId = new mongoDB(req.params.id)
  const database = await mongodb;
  const connect = await database.db().collection("contacts").deleteOne({_id: objectId}, true);
  res.setHeader("Content-Type", "application/json")
  if(connect.deletedCount > 0) {
    res.status(200).send()
  } else{
    res.status(500).send(connect.error || "error occurred while deleting the document.")
  }
}

module.exports = { allDoc, singleDoc, createContact, updateContact, deleteContact};
