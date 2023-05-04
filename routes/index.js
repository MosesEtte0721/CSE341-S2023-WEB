const test = require("../controller/test.js");
const express = require("express");
const app = express();
const router = express.Router();
const allDoc = require("../controller/contacts.js");





router.use(test);

router.use(require("./contacts"));





module.exports = router;