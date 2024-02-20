const { Schema, model } = require("mongoose");

const PhotoSchema = Schema({
  title: {
    type: String,
    required: [true, "The title is required."],
  },
  description: {
    type: String,
  },
  urlImage: {
    type: String,
    required: [true, "The url image is required."],
  },
});

module.exports = model("Photo", PhotoSchema);
