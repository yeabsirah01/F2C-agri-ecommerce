const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  // checkOut,
  deleteProduct,
  reviewProduct,
} = require("../controllers/product");
const {
  CheckoutCart,
  PaymentSuccessReturnUrl,
  IPNDestination,
  PaymentCancelReturnUrl,
} = require("../controllers/checkOut");
const authorizationMiddleware = require("./../middleware/authorization");
const router = express.Router();

router.post("/checkout", CheckoutCart);
router.get("/PaymentSuccess", PaymentSuccessReturnUrl);
router.get("/PaymentCancel", PaymentCancelReturnUrl);
router.post("/IPNDestination", IPNDestination);

router
  .route("/")
  .post(authorizationMiddleware, createProduct)
  .get(getAllProducts);

router.route("/review/:id").put(authorizationMiddleware, reviewProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

router.get("/user/:userId", getAllProducts);

module.exports = router;
