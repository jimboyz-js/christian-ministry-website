import nodemailer from "nodemailer";

async function sendEmail({
  name,
  email,
  text = "Your email client does not support HTML.",
  html,
  subject = "New Email Sent",
  recipient = process.env.EMAIL_RECEIVER,
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: recipient,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

export { sendEmail };
