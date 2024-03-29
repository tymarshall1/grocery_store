const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

exports.all_categories_get = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({});
  res.render("categories", { title: "Categories", allCategories });
});

exports.single_category = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const itemsInCategory = await Item.find({ category: req.params.id }).populate(
    "category"
  );
  res.render("single_category", {
    title: category.name,
    categoryDesc: category.description,
    itemsInCategory,
  });
});

exports.create_category_get = (req, res) => {
  res.render("add_category", { title: "Add a Category" });
};

exports.create_category_post = [
  body(
    "categoryName",
    " *Category name must be between 2 and 50 characters long."
  )
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .toLowerCase()
    .escape(),

  body(
    "categoryDesc",
    " *Category description must be at least 2 characters long."
  )
    .trim()
    .isLength({ min: 2 })
    .toLowerCase()
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.categoryName,
      description: req.body.categoryDesc,
    });

    //make sure category isnt in db already
    const categoryFilled = await Category.find({
      name: req.body.categoryName,
    }).exec();

    if (categoryFilled.length > 0) {
      res.render("add_category", {
        title: "Add a Category",
        categoryName: category.name,
        categoryDesc: category.description,
        nameError: " *Category already exists",
        descError: "",
      });
      return;
    }

    //if there are errors in the form
    if (!errors.isEmpty()) {
      let nameError = "";
      let descError = "";

      errors.array().forEach((error) => {
        if (error.path === "categoryName") nameError = error.msg;
        if (error.path === "categoryDesc") descError = error.msg;
      });

      res.render("add_category", {
        title: "Add a Category",
        categoryName: category.name,
        categoryDesc: category.description,
        nameError,
        descError,
      });
      return;
    }

    await category.save();
    res.redirect(category.url);
  }),
];

exports.single_category_delete_get = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("delete_category", { title: "Delete " + category.name, category });
});

exports.single_category_delete_post = asyncHandler(async (req, res) => {
  const categoryItems = await Item.find({ category: req.params.id }).exec();
  if (categoryItems.length === 0) {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories/");
  } else {
    res.render("category_delete_err", {
      title: "Error Deleting",
      categoryItems,
    });
  }
});

exports.single_category_update_get = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("add_category", {
    title: "Add a Category",
    categoryName: category.name,
    categoryDesc: category.description,
  });
});

exports.single_category_update_post = [
  body(
    "categoryName",
    " *Category name must be between 2 and 50 characters long."
  )
    .trim()
    .isLength({
      min: 2,
      max: 50,
    })
    .toLowerCase()
    .escape(),

  body(
    "categoryDesc",
    " *Category description must be at least 2 characters long."
  )
    .trim()
    .isLength({ min: 2 })
    .toLowerCase()
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let nameError = "";
      let descError = "";

      errors.array().forEach((error) => {
        if (error.path === "categoryName") nameError = error.msg;
        if (error.path === "categoryDesc") descError = error.msg;
      });

      res.render("add_category", {
        title: "Add a Category",
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc,
        nameError,
        descError,
      });
      return;
    }

    await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.categoryName,
      description: req.body.categoryDesc,
    });
    res.redirect("/categories/");
  }),
];
