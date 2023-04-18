const test = require("./controller/test.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;

app.use("/", test);

app.listen(port, ()=>{
    console.log(`Listening to port:${port}`)
})