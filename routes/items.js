const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.full_item_list_get);

module.exports = router;
