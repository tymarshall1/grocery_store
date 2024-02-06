const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");

router.get("/", categoriesController.all_categories_get);

router.get("/create", categoriesController.create_category_get);

router.post("/create", categoriesController.create_category_post);

router.get("/:id", categoriesController.single_category);

router.get("/delete/:id", categoriesController.single_category_delete_get);

router.post("/delete/:id", categoriesController.single_category_delete_post);

// router.get("/update/:id", categoriesController.single_category_update_get);

// router.post("/update/:id", categoriesController.single_category_update_post);

module.exports = router;
