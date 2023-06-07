const rout = require("express").Router();
const bio = require("../controller/pers-pro");

rout.get("/", bio.getBio);
rout.post("/", bio.createBio);

module.exports = rout;
