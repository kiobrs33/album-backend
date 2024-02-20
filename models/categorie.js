const { Schema, model } = require("mongoose");

const CategorieSchema = Schema({
  name: {
    type: String,
    required: [true, "The name category is required."],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Categorie", CategorieSchema);
