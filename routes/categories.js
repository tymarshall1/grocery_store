const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");

router.get("/", categoriesController.all_categories_get);

module.exports = router;
