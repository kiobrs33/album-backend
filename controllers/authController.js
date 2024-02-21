const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const postLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  // Verificar si el email existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "El passowrd o email son incorrectos - email",
    });
  }

  // Verificar si el user aún existe y no fue eliminado
  if (!user.state) {
    return res.status(400).json({
      msg: "El passowrd o email son incorrectos - { state :  false }",
    });
  }

  // Verificar el password
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "El passowrd o email son incorrectos - password",
    });
  }

  // Generar el JWT

  res.status(200).json({
    msg: "LOGIN OK!",
    email,
    password,
  });
};

module.exports = {
  postLogin,
};
