const { Router } = require("express");

const router = Router();
const {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/categorieController");

router.get("/", getCategories);
router.post("/", postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
