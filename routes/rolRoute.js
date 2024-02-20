const { Router } = require("express");

const router = Router();
const {
  getRoles,
  postRol,
  putRol,
  deleteRol,
} = require("../controllers/rolController");

router.get("/", getRoles);
router.post("/", postRol);
router.put("/:id", putRol);
router.delete("/:id", deleteRol);

module.exports = router;
