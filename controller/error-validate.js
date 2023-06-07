const db = require("../db/mongoDB").mongoDb();
const objectId = require("mongodb").ObjectId;
const {validationResult} = require("express-validator")

const putObject = async (req, res) => {
  try {
    const validate = validationResult(req);
    if (validate.errors.length > 0 ) {
      res.status(400).send(validate.errors);
      return;
    }
    const linkedin = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      linkedin_url: req.body.linkedin_url,
      email: req.body.email
    }

    const objId = new objectId(req.params.id);
    const dbase = await db;
    const dbCollection = await dbase
      .db("week06")
      .collection("error-validate")
      .replaceOne({_id: objId }, linkedin);
    
    if (dbCollection.modifiedCount > 0) {
       
      res.status(204).send(dbCollection);
    } else {
      res
        .status(500)
        .json({ message: dbCollection.error || "Error prevented the update" });
    }
  } catch (error) {
    res.status(500).json({message: "There was an error"});
  }
};

const getObjects = async (req, res) => {
  try {
    const database = await db;
    database
      .db("week06")
      .collection("error-validate")
      .find()
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        if (database) {
          res.status(200).send(JSON.stringify(list));
        } else {
          res.status(404).send("Documents Not Found");
        }
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getObject = async (req, res) => {
    try {
        const database = await db;
        const objId = new objectId(req.params.id);
        database
            .db('week06')
            .collection('error-validate')
            .find({_id: objId})
            .toArray()
            .then((obj) => {
                res.setHeader("Content-Type", "application/json");
                if(database) {
                    res.status(200).json(obj);
                } else {
                    res.status(404).send("Documents Not Found");
                }
            }
            )
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


const createObject = async (req, res) => {
  try {
    let result = validationResult(req);

    if(result.errors.length > 0){
      res.status(444).send(result.errors)
      return;
    }

    const info = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      linkedin_url: req.body.linkedin_url,
      email: req.body.email
    }

    const database = await db;
    const dbase = await database
      .db("week06")
      .collection("error-validate")
      .insertOne(info);
      

    if (dbase.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      console.log(`A document was inserted with the _id: ${dbase.insertedId}`);
      res.status(200).send("Successfully Inserted!");

    } else {
      res
        .status(500)
        .json(dbase.error || "Error occurred while creating the document.");
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

const deleteObject = async (req, res) => {
  try {
    const objId = new objectId(req.params.id);
    const dbase = await db;
    const dbCollection = await dbase
      .db("week06")
      .collection("error-validate")
      .deleteOne({_id: objId }, true);
      
    if (dbCollection.deletedCount > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send("Successfully Deleted!");

    } else {
      res.status(500).json({message: "Error occurred while deleting the document"});

    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  putObject,
  getObjects,
  getObject,
  createObject,
  deleteObject,
};
