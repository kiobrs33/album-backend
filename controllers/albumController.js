const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// Importando MODELOS
const User = require("../models/user");

// PARAMS http://localhost:8000/api/399
// BODY { name: "Rene", lastname: "Lozano" }
// QUERY http://localhost:8000/api/?index=10&page=24&code=lagarto

const albumGet = (req = request, res = response) => {
  const query = req.query;
  res.status(200).json({
    msg: "get API GET",
    ...query,
  });
};

const albumPost = async (req = request, res = response) => {
  const { password, email, ...rest } = req.body;
  const user = new User({ password, email, ...rest });

  // Encriptando Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardando la información en la BD
  await user.save();

  // Respuesta de la operacion
  res.status(200).json({
    msg: "User Created!",
    user,
  });
};

const albumPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, email, ...rest } = req.body;

  // Encriptando el nuevo Password
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // Se almacena la informacion ANTIGUA, ver otro metodo que devuelva la informacion ACTUALIZADA
  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    msg: "User Updated!",
    user,
  });
};

const albumDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: "get API DELETE",
  });
};

module.exports = {
  albumGet,
  albumPost,
  albumPut,
  albumDelete,
};
