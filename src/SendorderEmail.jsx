import React from "react";
import emailjs from "@emailjs/browser";


function SendOrderEmail({ cart, netAmount, tax, delivery, totalAmount, discount, customer }) {

  const handleSendEmail = () => {
    // Convert cart array items → HTML rows
    const itemsHtml = cart
      .map(
        (item) => `
        <tr>
          <td style="border:1px solid #ccc; padding:8px;">${item.name}</td>
          <td style="border:1px solid #ccc; padding:8px; text-align:center;">${item.quantity}</td>
          <td style="border:1px solid #ccc; padding:8px; text-align:right;">₹${item.price.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const templateParams = {
      company_name: "Your Company Name",
      customer_name: customer.name,
      email: customer.email,
      items_html: itemsHtml,
      net_amount: netAmount.toFixed(2),
      gst: tax.toFixed(2),
      discount: discount.toFixed(2),
      total_amount: totalAmount.toFixed(2),
    };

    emailjs
      .send(
        "service_8tio8cu",      // Your service ID
        "template_hxzv7lv",     // Your template ID
        templateParams,
        "NkEyHhpVAR7iniABo"    // Your public key
      )
      .then(
        () => alert("Order Email Sent! Successfully....👍"),
        (err) => alert("Email failed: " + err.text)
      );
  };

  return(
   <button onClick={handleSendEmail}className="send-btn">Send Order Email</button>
   
  );
}

export default SendOrderEmail;