const ypco = require("yenepaysdk");
const mongoose = require("mongoose");
const User = require("../models/User");
const express = require("express");
// let yenepay=;

const router = express.Router();

var sellerCode = "SB2294 ",
  successUrlReturn = "http://localhost:3000/", //"YOUR_SUCCESS_URL",//// handle the paymentsucess
  ipnUrlReturn = "http://localhost:5000/api/v1/pricing/IPNDestination", //"YOUR_IPN_URL",
  cancelUrlReturn = "", //"YOUR_CANCEL_URL",
  failureUrlReturn = "", //"YOUR_FAILURE_URL",
  pdtToken = "qnRsW9VBtr9hnq",
  useSandbox = true,
  currency = "ETB";

router.post("/", async (req, res) => {
  const { ItemId } = req.body;
  const { id } = req.user; // Assuming user is authenticated and id is in the request object

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscription.status === "active") {
      return res
        .status(400)
        .json({ message: "User already has an active subscription" });
    }

    // Update existing subscription object
    await User.updateOne(
      { _id: id },
      {
        $set: {
          "subscription.status": "active",
          "subscription.startDate": new Date(),
          "subscription.endDate": new Date(
            Date.now() + ItemId * 24 * 60 * 60 * 1000
          ),
        },
      }
    );
    var merchantOrderId = "12-34"; //"YOUR_UNIQUE_ID_FOR_THIS_ORDER";  //can also be set null
    var expiresAfter = 2880; //"NUMBER_OF_MINUTES_BEFORE_THE_ORDER_EXPIRES"; //setting null means it never expires
    var checkoutOptions = ypco.checkoutOptions(
      sellerCode,
      merchantOrderId,
      ypco.checkoutType.Express,
      useSandbox,
      expiresAfter,
      successUrlReturn,
      cancelUrlReturn,
      ipnUrlReturn,
      failureUrlReturn,
      currency
    );
    var checkoutItem = req.body;
    var url = ypco.checkout.GetCheckoutUrlForExpress(
      checkoutOptions,
      checkoutItem
    );

    res.json({ redirectUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// const paymentUrl = await yenepay.getPaymentUrl();
// user.subscription.status = "active";
// user.subscription.startDate = new Date();
// user.subscription.endDate = new Date(
//   user.subscription.startDate.getTime() + ItemId * 24 * 60 * 60 * 1000
// );
// await user.save();

// res.json({ paymentUrl });

// router.get("/subscription-success", async (req, res) => {
//   const { merchantOrderId } = req.query;

//   try {
//     const payment = await YenePay.getPayment(merchantOrderId);

//     if (payment.status === "paid") {
//       const { merchantCustomerId, quantity } = payment;
//       const user = await User.findById(merchantCustomerId);

//       if (user) {
//         user.subscription.status = "active";
//         user.subscription.startDate = new Date();
//         user.subscription.endDate = new Date(
//           user.subscription.startDate.getTime() + quantity * 24 * 60 * 60 * 1000
//         );
//         await user.save();
//       }
//     }

//     res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "An error occurred while processing your payment." });
//   }
// });

// router.get("/subscription-cancel", (req, res) => {
//   res.redirect("/");
// });

// router.post("/subscription-ipn", async (req, res) => {
//   const { merchantOrderId, status } = req.body;

//   try {
//     const payment = await YenePay.getPayment(merchantOrderId);

//     if (payment.status === "paid" && status === "paid") {
//       const { merchantCustomerId, quantity } = payment;
//       const user = await User.findById(merchantCustomerId);

//       if (user) {
//         user.subscription.status = "active";
//         user.subscription.startDate = new Date();
//         user.subscription.endDate = new Date(
//           user.subscription.startDate.getTime() + quantity * 24 * 60 * 60 * 1000
//         );
//         await user.save();
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   res.status(200).send("OK");
// });

router.post("/IPNDestination", async (req, res) => {
  var ipnModel = req.body;
  ypco.checkout
    .IsIPNAuthentic(ipnModel, useSandbox)
    .then((ipnStatus) => {
      //This means the payment is completed
      //You can now mark the order as "Paid" or "Completed" here and start the delivery process
      res.json({ "IPN Status": ipnStatus });
    })
    .catch((err) => {
      res.json({ Error: err });
    });
});

module.exports = router;
