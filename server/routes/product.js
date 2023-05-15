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
const userMiddleware = require("../middleware/usermiddleware");
const router = express.Router();

router.post("/checkout/:id", CheckoutCart);
router.get("/PaymentSuccess", PaymentSuccessReturnUrl);
router.get("/PaymentCancel", PaymentCancelReturnUrl);
router.post("/IPNDestination", IPNDestination);

router
  .route("/")
  .post(
    authorizationMiddleware,
    userMiddleware,
    checkSubscription,
    createProduct
  )
  .get(getAllProducts);

router
  .route("/review/:id")
  .put(
    authorizationMiddleware,
    userMiddleware,
    checkSubscription,
    reviewProduct
  );

router
  .route("/:id")
  .get(authorizationMiddleware, userMiddleware, checkSubscription, getProduct)
  .put(
    authorizationMiddleware,
    checkSubscription,
    userMiddleware,
    updateProduct
  )
  .delete(deleteProduct);

router.get("/user/:userId", getAllProducts);

module.exports = router;
