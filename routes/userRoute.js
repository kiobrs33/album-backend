const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/userController");
const {
  validateRol,
  validateExistEmail,
  validateExistIdUser,
} = require("../helpers/dbValidators");
const { validateAllFields } = require("../middlewares/validateAllFields");

// RUTAS
router.get("/", getUsers);
router.post(
  "/",
  [
    check("email", "El email no es valido").isEmail(),
    check("password", "El password debe tener más de 6 caracteres").isLength(6),
    check("name", "El name es requerido").not().isEmpty(),
    check("rol").custom(validateRol),
    check("email").custom(validateExistEmail),
    validateAllFields,
  ],
  postUser
);
router.put(
  "/:id",
  [
    check("id", "No es ID valido").isMongoId(),
    check("id").custom(validateExistIdUser),
    check("rol").custom(validateRol),
    validateAllFields,
  ],
  putUser
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(validateExistIdUser),
    validateAllFields,
  ],
  deleteUser
);

module.exports = router;
