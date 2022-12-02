const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  gitSingleProduct,
  updateProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
//router.route("/static").get(getAllProductsStatic);
router.route("/:id").get(gitSingleProduct).put(updateProduct);
//.delete(deleteProduct);
module.exports = router;
