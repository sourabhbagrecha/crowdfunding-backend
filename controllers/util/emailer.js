const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.sendEmail = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: 'sourabhbagrecha@gmail.com',
      subject: 'Your OTP for Crowdfunding App is here!',
      text: `OTP: ${otp}.`,
      html: `<h2>Your One Time Password: <strong>${otp}</strong></h2></p><p>You otp will expire in next 10 mins. Make sure you log in before that!</p>`,
    };
    sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error);
  }
}