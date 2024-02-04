const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.full_item_list_get);

router.get("/create", itemController.create_item_get);

router.post("/create", itemController.create_item_post);

module.exports = router;
