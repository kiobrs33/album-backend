const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

// Importando MODELOS
const User = require("../models/user");

// PARAMS http://localhost:8000/api/399
// BODY { name: "Rene", lastname: "Lozano" }
// QUERY http://localhost:8000/api/?index=10&page=24&code=lagarto

const getUsers = async (req = request, res = response) => {
  // TODO validar que los QUERYS solo sean numeros y no letras
  const { limit = 10, skip = 0 } = req.query;
  const query = { state: true }; // Solo los registros que no fueron borrados

  const [users, total] = await Promise.all([
    User.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
    User.countDocuments(query),
  ]);

  res.status(200).json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { password, email, ...rest } = req.body;
  const user = new User({ password, email, ...rest });

  // Encriptando Password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardando la información en la BD
  await user.save();

  // Respuesta de la operacion
  res.status(200).json({
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, email, ...rest } = req.body;

  // Encriptando el nuevo Password
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // Retorna la informacion anterior a la actualizacion
  const user = await User.findByIdAndUpdate(id, rest);

  res.status(200).json({
    msg: "User Updated!",
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // Aqui si se elimina de la BD
  // const user = await User.findByIdAndDelete(id)

  // Cambiamos el STATE del usuario para mantenerlo aun en la BD
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    user,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
