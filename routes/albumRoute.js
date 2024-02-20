const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  albumGet,
  albumPost,
  albumPut,
  albumDelete,
} = require("../controllers/albumController");
const { validateAllFields } = require("../middlewares/validateAllFields");
const {
  validateRol,
  validateExistEmail,
  validateExistIdUser,
} = require("../helpers/dbValidators");

// RUTAS
router.get("/", albumGet);
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
  albumPost
);
router.put(
  "/:id",
  [
    check("id", "No es ID valido").isMongoId(),
    check("id").custom(validateExistIdUser),
    check("rol").custom(validateRol),
    validateAllFields,
  ],
  albumPut
);
router.delete("/", albumDelete);

module.exports = router;
