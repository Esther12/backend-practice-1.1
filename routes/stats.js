const router = require("express").Router();
const statsController = require("../controllers/statsController");

router.route("stats/1").post(statsController.getall);
