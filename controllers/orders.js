const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../middleware/error-handler");
const Order = require("../models/order");
const csv = require("csv-parser");
const fs = require("fs");
const csvtojson = require("csvtojson");
// @desc      Get all productts
// @route     GET /api/v1/products
// @access    Public
// exports.getAllProducts = asyncHandler(async (req, res, next) => {
//   const products = await Product.find();
//   res.status(200).json({
//     length: products.length,
//     message: "all products",
//     data: products,
//   });
// });

// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const results = [];
  fs.createReadStream("order1.csv")
    .pipe(csv({}))
    .on("data", (data) => {
      results.push(data);
      Order.insertMany(results);
      res.status(201).json({
        success: true,
        data: results,
      });
    })
    .on("end", () => {
      console.log(results);
    });
  // csvtojson()
  //   .fromFile("order1.csv")
  //   .then((jsonObj) => {
  //     console.log(jsonObj);
  //     Order.insertMany(jsonObj)
  //       .then(function () {
  //         console.log("data inserted", jsonObj);
  //         res.status(201).json({
  //           success: true,
  //           data: jsonObj,
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   });
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

// @desc      updateProduct
// @route     PUT /api/v1/products/:id
// @access    Public
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`product not found with id of ${req.params.id}`, 404)
    );
  }

  product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
});

// @desc      deleteProduct
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`product not found with id of ${req.params.id}`, 404)
    );
  }

  product.remove();

  res.status(200).json({ success: true, data: {} });
});
