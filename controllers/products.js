const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../middleware/error-handler");
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

// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public
exports.gitSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});
