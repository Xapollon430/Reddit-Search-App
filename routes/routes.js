const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.landing);
router.get("/redditApi", Controller.redditApi);

module.exports = router;
