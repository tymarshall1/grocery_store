const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");

router.get("/", categoriesController.all_categories_get);

router.get("/create", categoriesController.create_category_get);

router.post("/create", categoriesController.create_category_post);

module.exports = router;
