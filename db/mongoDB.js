const { MongoClient } = require("mongodb");
const env = require("dotenv").config();

// mongoDb connection string
const envVar = process.env.MONGODB_URI;

/* creates instances of MongoClient constructor
   and takes the connection string as an argument

*/

// Establish a connection with mongoDb and processes retrieveData function
const mongoDb = async () => {
  const mongoClient = await MongoClient.connect(envVar);
  try {
    if (mongoClient) {
      console.log("connected to the database as it should");
    }
  } catch (error) {
    console.error({ error: "error occured" });
  } finally {
    return mongoClient;
  }
};

module.exports = { mongoDb };
