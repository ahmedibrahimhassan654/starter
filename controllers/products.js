const asyncHandler = require("../middleware/async");
const Product = require("../models/product");
// @desc      Get all productts
// @route     GET /api/v1/products
// @access    Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    length: products.length,
    message: "all products",
    data: products,
  });
});

// @desc      Create new bootcamp
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});
