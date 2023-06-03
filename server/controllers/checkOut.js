"use strict";
var ypco = require("yenepaysdk");
const User = require("../models/User");

var ipnUrlReturn =
  "https://f2-c-agri-ecommerce.vercel.app/api/v1/products/IPNDestination";
var cancelUrlReturn = "";
var failureUrlReturn = "";
var useSandbox = true;
var currency = "ETB";

const CheckoutExpress = function (req, res) {
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
  res.redirect(url);
};

const CheckoutCart = async function (req, res) {
  try {
    const { id } = req.params;
    var successUrlReturn = `http://localhost:3000/products/checkout/${id}?clear_cart=true`;
    // Find the user by ID and exclude the password field
    const user = await User.findById(id);
    //   //   // Access the user data
    const sellerCode = user.paymentInfo.number;
    const pdtToken = user.paymentInfo.pdt;
    console.log(sellerCode);
    console.log(pdtToken);

    console.log(id);

    var merchantOrderId = "ab-cd";
    var expiresAfter = 2880;
    var checkoutOptions = ypco.checkoutOptions(
      sellerCode,
      merchantOrderId,
      ypco.checkoutType.Cart,
      useSandbox,
      expiresAfter,
      successUrlReturn,
      cancelUrlReturn,
      ipnUrlReturn,
      failureUrlReturn
    );

    var data = req.body.newItemsArray;

    var checkoutItems = data;
    // var totalItemsDeliveryFee = 100;
    // var totalItemsDiscount = 50;
    // var totalItemsHandlingFee = 30;
    var totalPrice = 0;

    checkoutItems.forEach(function (element) {
      totalPrice += element.UnitPrice * element.Quantity;
    });

    var totalItemsTax1 = 0.15 * totalPrice;
    var totalItemsTax2 = 0;

    checkoutOptions.SetOrderFees(
      // totalItemsDeliveryFee,
      // totalItemsDiscount,
      // totalItemsHandlingFee,
      totalItemsTax1,
      totalItemsTax2
    );

    var url = ypco.checkout.GetCheckoutUrlForCart(
      checkoutOptions,
      checkoutItems
    );

    res.json({ redirectUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const IPNDestination = function (req, res) {
  const { id } = req.params;
  var successUrlReturn = `http://localhost:3000/products/checkout/${id}?clear_cart=true`;
  const user = User.findById(id).select({ password: 0 });
  var sellerCode = user.paymentInfo.number;
  var pdtToken = user.paymentInfo.pdt;

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
};

const PaymentSuccessReturnUrl = function (req, res) {
  const { id } = req.params;
  const user = User.findById(id).select({ password: 0 });
  var sellerCode = user.paymentInfo.number;
  var pdtToken = user.paymentInfo.pdt;

  var params = req.query;
  var pdtRequestModel = new ypco.pdtRequestModel(
    pdtToken,
    params.TransactionId,
    params.MerchantOrderId,
    useSandbox
  );
  // console.log(req);
  console.log("success url called");
  ypco.checkout
    .RequestPDT(pdtRequestModel)
    .then((pdtJson) => {
      if (pdtJson.result == "SUCCESS") {
        console.log("success url called - Paid");
        console.log("TransactionId: " + pdtJson.TransactionId);
        console.log("MerchantOrderId: " + pdtJson.MerchantOrderId);
        console.log("Amount: " + pdtJson.Amount);
        console.log("TransactionDate: " + pdtJson.TransactionDate);
        console.log("Buyer name: " + pdtJson.Buyer.Name);
        console.log("Buyer email: " + pdtJson.Buyer.Email);
        console.log("Seller name: " + pdtJson.Seller.Name);
        console.log("Seller email: " + pdtJson.Seller.Email);
        res.status(200).json({ message: "Payment successful" });
      } else {
        res.status(400).json({ message: "Payment failed" });
      }
      res.redirect("/");
    })
    .catch((err) => {
      res.redirect("/");
    });
};

const PaymentCancelReturnUrl = function (req, res) {
  const { id } = req.params;
  const user = User.findById(id).select({ password: 0 });
  var sellerCode = user.paymentInfo.number;
  var pdtToken = user.paymentInfo.pdt;

  var params = req.query;
  var pdtRequestModel = new ypco.pdtRequestModel(
    pdtToken,
    params.TransactionId,
    params.MerchantOrderId,
    useSandbox
  );
  ypco.checkout
    .RequestPDT(pdtRequestModel)
    .then((pdtJson) => {
      if ((pdtJson.Status = "Canceled")) {
        //This means the payment is canceled.
        //You can extract more information of the transaction from the pdtResponse
        //You can now mark the order as "Canceled" here.
      }
      res.json({ result: pdtJson.result });
    })
    .catch((err) => {
      //This means the pdt request has failed.
      //possible reasons are
      //1. the TransactionId is not valid
      //2. the PDT_Key is incorrect

      res.json({ result: "Failed" });
    });
};

module.exports = {
  CheckoutExpress,
  CheckoutCart,
  IPNDestination,
  PaymentSuccessReturnUrl,
  PaymentCancelReturnUrl,
};
