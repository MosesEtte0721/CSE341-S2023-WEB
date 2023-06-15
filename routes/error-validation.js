const express = require("express");
const router = express.Router();
const error = require("../controller/error-validate");
const {checkSchema} = require("express-validator");
const valid = require("../validator").validate;

router.get('/',  error.getObjects);
router.get('/:id',  error.getObject);
router.put('/:id', valid, error.putObject);
router.post('/', valid, error.createObject);
router.delete('/:id', error.deleteObject);

module.exports = router;