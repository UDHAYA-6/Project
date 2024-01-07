import React, { useEffect } from "react";

const PayPalButton = () => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "77.44",
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((orderData) => {
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                window.location.href = "/success";
              });
            },
          })
          .render("#paypal-button-container");
      };
    };

    loadPayPalScript();
  }, []);

  return (
    <div
      id="paypal-button-container"
      style={{
        margin: "2%",
        backgroundColor: "white",
        padding: "1rem",
        width: "300px",
        height: "300px",
        borderRadius: "10px",
      }}
    >
      <center>
        <h1>Welcome!</h1>
      </center>
      {/* Placeholder for the PayPal button */}
    </div>
  );
};

export default PayPalButton;
