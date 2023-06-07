const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDoc));

router.use("/bio-docs", swaggerUi.serve);
router.get("/bio-docs", swaggerUi.setup(swaggerDoc));

module.exports = router;
