const express = require("express");
const router = express.Router();
const error = require("../controller/error-validate");
const {checkSchema} = require("express-validator");
const validate = require("../validator").schema;

router.get('/',  error.getObjects);
router.get('/:id',  error.getObject);
router.put('/:id', checkSchema(validate), error.putObject);
router.post('/', checkSchema(validate), error.createObject);
router.delete('/:id', error.deleteObject);

module.exports = router;