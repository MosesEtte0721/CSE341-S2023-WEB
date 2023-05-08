const express = require("express");
const mongoDb = require("./db/mongoDB");
const port = process.env.PORT || 8080;
const test = require("./controller/test.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});



app.use("/", require("./routes"));

app.listen(port, (req, res) => {
  console.log(`listening to port: ${port}`);
});
