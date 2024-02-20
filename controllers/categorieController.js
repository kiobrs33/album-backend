const { response, request } = require("express");
const { validationResult } = require("express-validator");

// MODELOS
const Rol = require("../models/rol");

const getCategories = (req = request, res = response) => {
  res.status(200).json({
    msg: "get CATEGORIES",
  });
};

const postCategory = async (req = request, res = response) => {
  const body = req.body;
  const category = new Rol(body);

  await category.save();

  res.status(200).json({
    msg: "post CATEGORY",
    category,
  });
};

const putCategory = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "put CATEGORY",
    id,
  });
};

const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "delete CATEGORY",
    id,
  });
};

module.exports = {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
