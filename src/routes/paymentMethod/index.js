const paypal = require("paypal-rest-sdk");
const User=require("../../modals/user");

paypal.configure({
  mode: "sandbox", // or 'live'
  client_id:
    "AVFBCKlcWRIeuuKAmeit-G4nesHt7r88Uqj8OzkUXLURRG_Z2g8GzyvYX49CQ_yu9lygmtZPwmcfIt41",
  client_secret:
    "EPbF4egL7jeacE-BSRFhSw3jX-EsRFOqUtQYsMaQpjG19fRvi8r07uzCha0o_P8ou1e0z6P4ZaUcghi4",
});

const payPalConfig = (req, res) => {
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://localhost:5001/success",
//       cancel_url: "http://localhost:5001/cancel",
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: "item",
//               sku: "item",
//               price: "1.00",
//               currency: "USD",
//               quantity: 1,
//             },
//           ],
//         },
//         amount: {
//           currency: "USD",
//           total: "1.00",
//         },
//         description: "This is the payment description.",
//       },
//     ],
//   };


const create_payment_json = {
    intent: "sale",
    
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5001/payment/success",
      cancel_url: "http://localhost:5001/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Subscription",
              sku: "subscription",
              price: "39.90",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "39.90",
        },
        description: "Monthly Subscription Payment.",
      },
    ],
  };


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      res.status(500).send(error);
    } else {
      console.log("payment section", JSON.stringify(payment, null, 2));
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          console.log("payment.links[i].href", payment.links[i].href);
          // res.redirect(payment.links[i].href);
          res.json({ approvalUrl: payment.links[i].href });
          return;
        }
      }
      // res.status(400).send('No approval_url found in PayPal response');
    }
  });
};

const paymentSuccess = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "39.90",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json, 
    async  function (error, payment) {
      console.log("paymentpayment", payment);
      if (error) {
        // console.error(error.response);
        // res.status(500).send(error);
        console.error("Payment execution error: ", JSON.stringify(error.response, null, 2));
        res.status(500).send(error);
      } else {
        // console.log("paymentpayment", payment);
        // res.send("Payment success");

        try {
            // const userId = req.userId; // Ensure you have the user ID available in the request
            const user = await User.findById('66373b465a4336bfe28c3aeb');
            if (user) {
              user.verified = 'verified'; // Assuming 'verified' is the enum value for verified status
              user.verificationDate = new Date();
              await user.save();
              res.status(200).send("Payment success and user verified");
            } else {
              res.status(404).send("User not found");
            }
          } catch (err) {
            console.error("Database update error: ", err);
            res.status(500).send("Error updating user verification status");
          }

      }
    }
  );
};

const cancelPay = (req, res) => {
  res.status(200).send("Payment canceled");
};

module.exports = { payPalConfig, paymentSuccess,cancelPay };
