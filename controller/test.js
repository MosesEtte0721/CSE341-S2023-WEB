const express = require("express");
const router = express.Router();


router.get("/",(req, res)=>{
    res.send("<h1>Etukudo Etukudo</h1><p>I am testing this application</p>")
})



module.exports = router;
