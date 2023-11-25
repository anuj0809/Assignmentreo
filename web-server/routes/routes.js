const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller')
const paperController = require("../controllers/paperController")

router.get("/",homeController);
router.get("/getPaper",paperController)

module.exports = router