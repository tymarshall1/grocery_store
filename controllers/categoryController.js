exports.all_categories_get = (req, res) => {
  res.render("categories", { title: "Categories" });
};

exports.create_category_get = (req, res) => {
  res.render("add_category", { title: "Add a Category" });
};

exports.create_category_post = (req, res) => {
  console.log("sick");
  res.redirect("/");
};
