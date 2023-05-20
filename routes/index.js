const test = require("../controller/test.js");
const express = require("express");
const app = express();
const router = express.Router();
const allDoc = require("../controller/contacts.js");


router.use("/", require("./swagger.js"))
router.use("/bio", require("./bio"))
// router.use(test);

// router.use("/contacts", require("./contact"));

module.exports = router;
