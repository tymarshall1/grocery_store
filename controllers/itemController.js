const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.full_item_list_get = asyncHandler(async (req, res) => {
  const allItems = await Item.find({}).populate("category");
  res.render("items", { title: "All Items", allItems });
});

exports.create_item_get = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({});
  res.render("add_item", { title: "Add an Item", allCategories });
});

exports.create_item_post = [
  body("itemName", " *Name must be between 2 and 15 characters long.")
    .trim()
    .isLength({ min: 2, max: 15 })
    .toLowerCase()
    .escape(),

  body("itemDesc", " *Description must be at least 2 characters long.")
    .trim()
    .isLength({ min: 2 })
    .toLowerCase()
    .escape(),

  body("itemCategory", " *Description must be at least 2 characters long.")
    .trim()
    .escape(),

  body("itemPrice", " *Price must be a float. Ex. 2.99")
    .trim()
    .isFloat()
    .escape(),

  body("itemNumInStock", " *Number in stock must be an integer value. Ex. 3")
    .trim()
    .isInt()
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const allCategories = await Category.find({});

    const newItem = new Item({
      name: req.body.itemName,
      description: req.body.itemDesc,
      category: req.body.itemCategory,
      price: req.body.itemPrice,
      number_in_stock: req.body.itemNumInStock,
    });

    if (!errors.isEmpty()) {
      nameError = "";
      descriptionError = "";
      categoryError = "";
      priceError = "";
      numberInStockError = "";

      errors.array().forEach((error) => {
        if (error.path === "itemName") nameError = error.msg;
        if (error.path === "itemDesc") descriptionError = error.msg;
        if (error.path === "itemCategory") categoryError = error.msg;
        if (error.path === "itemPrice") priceError = error.msg;
        if (error.path === "itemNumInStock") numberInStockError = error.msg;
      });

      res.render("add_item", {
        title: "Add an Item",
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        price: newItem.price,
        number_in_stock: newItem.number_in_stock,
        allCategories,
        nameError,
        descriptionError,
        categoryError,
        priceError,
        numberInStockError,
      });
    }

    const itemExists = await Item.find({ name: newItem.name }).exec();
    if (itemExists.length > 0) {
      res.render("add_item", {
        title: "Add an Item",
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        price: newItem.price,
        number_in_stock: newItem.number_in_stock,
        allCategories,
        nameError: " *This item already exists.",
      });
    } else {
      await newItem.save();
      res.redirect("/items/");
    }
  }),
];

exports.single_item_get = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("single_item", { title: item.name });
});

exports.single_item_delete_get = asyncHandler(async (req, res) => {
  res.render("delete_confirm", { title: "delete item" });
});

exports.single_item_delete_post = asyncHandler(async (req, res) => {});

exports.single_item_update_get = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  const allCategories = await Category.find({});

  res.render("add_item", {
    title: "Update Item",
    name: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    number_in_stock: item.number_in_stock,
    allCategories,
    nameError: "",
    descriptionError: "",
    categoryError: "",
    priceError: "",
    numberInStockError: "",
  });
});

exports.single_item_update_post = [
  body("itemName", " *Name must be between 2 and 15 characters long.")
    .trim()
    .isLength({ min: 2, max: 15 })
    .toLowerCase()
    .escape(),

  body("itemDesc", " *Description must be at least 2 characters long.")
    .trim()
    .isLength({ min: 2 })
    .toLowerCase()
    .escape(),

  body("itemCategory", " *Description must be at least 2 characters long.")
    .trim()
    .escape(),

  body("itemPrice", " *Price must be a float. Ex. 2.99")
    .trim()
    .isFloat()
    .escape(),

  body("itemNumInStock", " *Number in stock must be an integer value. Ex. 3")
    .trim()
    .isInt()
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const allCategories = await Category.find({});

    if (!errors.isEmpty()) {
      nameError = "";
      descriptionError = "";
      categoryError = "";
      priceError = "";
      numberInStockError = "";

      errors.array().forEach((error) => {
        if (error.path === "itemName") nameError = error.msg;
        if (error.path === "itemDesc") descriptionError = error.msg;
        if (error.path === "itemCategory") categoryError = error.msg;
        if (error.path === "itemPrice") priceError = error.msg;
        if (error.path === "itemNumInStock") numberInStockError = error.msg;
      });

      res.render("add_item", {
        title: "Update Item",
        name: req.body.itemName,
        description: req.body.itemDesc,
        category: req.body.itemCategory,
        price: req.body.itemPrice,
        number_in_stock: req.body.itemNumInStock,
        allCategories,
        nameError,
        descriptionError,
        categoryError,
        priceError,
        numberInStockError,
      });
    } else {
      await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.itemName,
        description: req.body.itemDesc,
        category: req.body.itemCategory,
        price: req.body.itemPrice,
        number_in_stock: req.body.itemNumInStock,
      });
      res.redirect("/items/");
    }
  }),
];
