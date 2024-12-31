const express = require('express');
const dotenv = require('dotenv');
const paypalService = require('./paypalservice');
const app = express();
app.use(express.json());
const port =3000;
app.get("/payment", function (req, res) {
  // res.send("Server started ........");
  res.sendFile(__dirname + "/payment.html");
});

// success page
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});
// error page
app.get("/err", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});
app.get("/buy", (req, res) => {
var payment = {
  intent: "sale",
  payer: {
    payment_method: "paypal",
  },
  redirect_urls: {
    return_url: "http://127.0.0.1:4000/success",
    cancel_url: "http://127.0.0.1:4000/err",
  },
  transactions: [
    {
      amount: {
        total: 39.0,
        currency: "USD",
      },
      description: " a book on mean stack ",
    },
  ],
};

  paypalService
    .createPaypalPayment(payment)
    .then((transactions) => {
      console.log(JSON.stringify(transactions));
      const transactionId = transactions.id;
      console.log(transactionId);
      res.redirect(transactions.links[1].href); // redirect to paypal payment page
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/err");
    });
  res.status;
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
