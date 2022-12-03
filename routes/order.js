const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orders");

router
  .route("/")
  //.get(getAllProducts)
  .post(createOrder);
//router.route("/static").get(getAllProductsStatic);
// router
//   .route("/:id")
//   .get(gitSingleProduct)
//   .put(updateProduct)
//   .delete(deleteProduct);
module.exports = router;
