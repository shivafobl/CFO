// // sendDailySummary.js
// const nodemailer = require('nodemailer');

// const sendEmail = async () => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'sender@gmail.com',
//       pass: 'password',
//     },
//   });

//   const mailOptions = {
//     from: 'sender@gmail.com',
//     to: 'receiver@gmail.com',
//     subject: 'Daily Order Summary',
//     text: 'This is the daily order summary.',
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// sendEmail().catch(console.error);

const express = require('express');
const cron = require('node-cron');
const { Client } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'CFO2',
  password: 'Shiva@143',
  port: 5432,
});

client.connect();

// Function to send email
const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sender@gmail.com', // Replace with your email
      pass: 'password', // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: 'sender@gmail.com', // Replace with your email
    to: 'receiver@gmail.com', // Replace with the recipient's email
    subject: 'Daily Order Summary',
    text: 'This is the daily order summary.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

// Function to run the scheduled task
const runScheduledTask = async () => {
  console.log('Running scheduled task at 7:54 PM');
  await sendEmail(); // Call the sendEmail function
};

// Schedule the task to run at 7:54 PM every day
cron.schedule('54 19 * * *', () => {
  runScheduledTask();
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
