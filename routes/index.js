const router = require("express").Router();
const apiRouter = require("./stats");

//API end points

router.use("/collection", apiRouter);

module.exports = router;
