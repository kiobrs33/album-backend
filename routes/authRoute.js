const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { postLogin } = require("../controllers/authController");
const { validateAllFields } = require("../middlewares/validateAllFields");

router.post(
  "/login",
  [
    check("email", "El email no es valido").isEmail(),
    check("password", "El passowrd es invalido").not().isEmpty(),
    validateAllFields,
  ],
  postLogin
);

module.exports = router;
