const { response, request } = require("express");

const Rol = require("../models/rol");

const getRoles = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query;
  const query = { deleted: false };

  const [roles, total] = await Promise.all([
    Rol.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
    Rol.countDocuments(query),
  ]);

  res.status(200).json({
    total,
    roles,
  });
};

const postRol = async (req = request, res = response) => {
  const body = req.body;
  const rol = new Rol(body);

  await rol.save();

  res.status(200).json({
    rol,
  });
};

const putRol = async (req = request, res = response) => {
  const { id } = req.params;
  const body = req.body;

  const rol = await Rol.findByIdAndUpdate(id, body);

  res.status(200).json({
    rol,
  });
};

const deleteRol = async (req = request, res = response) => {
  const { id } = req.params;
  const rol = await Rol.findByIdAndUpdate(id, { deleted: true });

  res.status(200).json({
    rol,
  });
};

module.exports = {
  getRoles,
  postRol,
  putRol,
  deleteRol,
};
