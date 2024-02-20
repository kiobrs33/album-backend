// MODELOS
const Rol = require("../models/rol");
const User = require("../models/user");

const validateRol = async (rol = "") => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado en la Base de Datos`);
  }
};

const validateExistEmail = async (email = "") => {
  const isThereEmail = await User.findOne({ email });
  if (isThereEmail) {
    throw new Error(`El email: ${email} ya existe`);
  }
};

const validateExistIdUser = async (id = "") => {
  const isThereId = await User.findById(id);
  if (!isThereId) {
    throw new Error(`El Id del usuario no existe`);
  }
};

module.exports = {
  validateRol,
  validateExistEmail,
  validateExistIdUser,
};
