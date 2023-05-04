const express = require("express");
// const parser = require("body-parser");
const mongoDb = require("./db/mongoDB.js");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());


app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next()
})

app.use(require("./routes/index"));


app.listen(port,(req,res)=>{
    console.log(`listening to port: ${port}`);
})