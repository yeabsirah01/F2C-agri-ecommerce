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
const checkSubscription = require("../middleware/checkSubscription");
const userMiddleware = require("../middleware/userMiddleware");
const emailVerified = require("../middleware/emailVerified");
const router = express.Router();

router.post("/checkout/:id", CheckoutCart);
router.get("/PaymentSuccess", PaymentSuccessReturnUrl);
router.get("/PaymentCancel", PaymentCancelReturnUrl);
router.post("/IPNDestination", IPNDestination);

router
  .route("/")
  .post(
    authorizationMiddleware,

    emailVerified,
    userMiddleware,
    checkSubscription,
    createProduct
  )
  .get(getAllProducts);

router
  .route("/review/:id")
  .put(
    authorizationMiddleware,
    emailVerified,
    userMiddleware,
    checkSubscription,
    reviewProduct
  );

router
  .route("/:id")
  .get(
    authorizationMiddleware,
    emailVerified,
    userMiddleware,
    checkSubscription,
    getProduct
  )
  .put(
    authorizationMiddleware,
    emailVerified,
    checkSubscription,
    userMiddleware,
    updateProduct
  )
  .delete(deleteProduct);

router.get("/user/:userId", getAllProducts);

module.exports = router;
