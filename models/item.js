const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  number_in_stock: {
    type: Number,
    required: true,
  },
});

itemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
