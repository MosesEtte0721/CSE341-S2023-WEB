const express = require("express");
const router = express.Router();
const mong = require("../controller/contacts");

const app = express();

const pro = (req, res, next) =>{
    try{
        if(req.session.token) {
            next();
        
        }else{
            throw new Error("Please login to access this resource")
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
// gets multiple documents from a collection in the mongoDB
router.get("/", pro, mong.allDoc);
// retrieved a single document from a collection in the mongoDB
router.get("/:id", pro, mong.singleDoc);
// create and insert a new single document to a collection in the mongoDB
router.post("/", pro, mong.createContact);

router.put("/:id", pro, mong.updateContact);

router.delete("/:id", mong.deleteContact);
//
module.exports = router;
