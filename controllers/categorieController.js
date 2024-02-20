const { response, request } = require("express");
const { validationResult } = require("express-validator");

// MODELOS
const Category = require("../models/categorie");

const getCategories = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query;
  const query = { deleted: false };

  const [categories, total] = await Promise.all([
    Category.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
    Category.countDocuments(query),
  ]);

  res.status(200).json({
    total,
    categories,
  });
};

const postCategory = async (req = request, res = response) => {
  const body = req.body;
  const category = new Category(body);

  await category.save();

  res.status(200).json({
    category,
  });
};

const putCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const body = req.body;

  const category = await Category.findByIdAndUpdate(id, body);

  res.status(200).json({
    category,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { deleted: true });

  res.status(200).json({
    category,
  });
};

module.exports = {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
