const express = require("express");
const router = express.Router();
// const contacts = require("./contacts.js");


router.get("/", (req, res, next) => {
    res.send("<h1>Etukudo Etukudo</h1><p>I am testing this application</p>")
    next();
})

// router.get("/contacts", (req, res, next) => {
//     res.send(contacts);
//     next();
// });



module.exports = router;
