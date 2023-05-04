const test = require("../controller/test.js");
const express = require("express");
const app = express();
const router = express.Router();
const allDoc = require("../controller/contacts");

router.use(test);

router.use(require("./contact.js"));

module.exports = router;
