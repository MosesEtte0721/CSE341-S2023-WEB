const express = require("express");
const router = express.Router();
const mong = require("../controller/contacts");

const app = express();

// gets multiple documents from a collection in the mongoDB
router.get("/", mong.allDoc);

// retrieved a single document from a collection in the mongoDB
router.get("/:id", mong.singleDoc);

//
module.exports = router;
