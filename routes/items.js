const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.full_item_list_get);

router.get("/create", itemController.create_item_get);

router.post("/create", itemController.create_item_post);

router.get("/:id", itemController.single_item_get);

router.get("/delete/:id", itemController.single_item_delete_get);

router.post("/delete/:id", itemController.single_item_delete_post);

router.get("/update/:id", itemController.single_item_update_get);

router.post("/update/:id", itemController.single_item_update_post);

module.exports = router;
