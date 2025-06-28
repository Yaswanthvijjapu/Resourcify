const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
    });
    console.log('Email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

const sendBookingStatusEmail = async (to, resourceName, status, startTime, endTime) => {
  const subject = `Booking ${status} for ${resourceName}`;
  const html = `
    <h1>Booking Update</h1>
    <p>Your booking for <strong>${resourceName}</strong> from <strong>${new Date(startTime).toLocaleString()}</strong> to <strong>${new Date(endTime).toLocaleString()}</strong> has been <strong>${status}</strong>.</p>
    <p>Please contact your Manager for further details.</p>
  `;
  await sendEmail(to, subject, html);
};

module.exports = { sendEmail, sendBookingStatusEmail };