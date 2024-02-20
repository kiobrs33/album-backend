const { Schema, model } = require("mongoose");

const CategorieSchema = Schema({
  name: {
    type: String,
    required: [true, "The name category is required."],
  },
});

module.exports = model("Categorie", CategorieSchema);
