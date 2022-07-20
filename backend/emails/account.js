const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");

// const sendgridAPIKey =
//   "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";

// sgMail.setApiKey(sendgridAPIKey);
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "the.books.app@gmail.com",
    pass: "Set@12345",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const sendWelcomeEmail = (email, name) => {
  let mailoptions = {
    from: "the.books.app@gmail.com",
    to: email,
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  };
  try {
    transporter.sendMail(mailoptions);
  } catch (e) {
    console.log("email not send");
  }

  //   sgMail.send({
  //     to: email,
  //     from: "andrew@mead.io",
  //     subject: "Thanks for joining in!",
  //     text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  //   });
};

const sendCancelationEmail = (email, name) => {
  //   sgMail.send({
  //     to: email,
  //     from: "andrew@mead.io",
  //     subject: "Sorry to see you go!",
  //     text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  //   });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
