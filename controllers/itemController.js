exports.full_item_list_get = (req, res) => {
  res.render("items", { title: "All Items" });
};

exports.create_item_get = (req, res) => {
  res.render("add_item", { title: "Add an Item" });
};

exports.create_item_post = (req, res) => {};
