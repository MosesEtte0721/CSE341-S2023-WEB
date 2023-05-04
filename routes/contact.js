const express = require("express");
const router = express.Router();
const mong = require("../controller/contacts.js");
const app = express();

router.get("/contacts", mong.allDoc);

module.exports = router;
