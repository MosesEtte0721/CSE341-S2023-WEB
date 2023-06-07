const database = require("../db/mongoDB").mongoDb();

const createBio = async (req, res, next) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    car_brand: req.body.car_brand,
    car_model: req.body.car_model,
    occupation: req.body.occupation,
    education: req.body.education,
    DOB: req.body.DOB,
    linkedin_profile: req.body.linkedin_profile,
    convicted: req.body.convicted,
    certification: req.body.certification,
    confident: req.body.confident,
    facebook: req.body.facebook,
    facebook_profile: req.body.facebook_profile,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
  };

  const db = await database;
  const dbCollection = await db.db("week05").collection("bio").insertOne(data);

  if (dbCollection.acknowledged) {
    const resp = `A new document has just been saved to the collection`;
    res.status(200).json(resp);
  } else {
    res
      .status(500)
      .json(
        dbCollection.error || "An error occurred while creating the document"
      );
  }
};

const getBio = async (req, res, next) => {
  const db = await database;
  const dbCollection = await db
    .db("week05")
    .collection("bio")
    .find({})
    .toArray();

  if (dbCollection) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(dbCollection);
  } else {
    res.send(404).send(dbCollection.error || "Not found");
  }
};

module.exports = { createBio, getBio };
