const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

/*
 * Helper to append submissions to a log file. This allows you to see
 * form submissions without requiring an external mail server. Each
 * submission will be written as a JSON object on its own line. If
 * email credentials are provided via environment variables the same
 * submission will also be emailed to the target address.
 */
const logSubmission = (type, data) => {
  const logEntry = { timestamp: new Date().toISOString(), type, ...data };
  fs.appendFile('messages.log', JSON.stringify(logEntry) + '\n', err => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
};

/*
 * Helper to send an email. When EMAIL_USER and EMAIL_PASS environment
 * variables are set this function will attempt to deliver an email to
 * the RECIPIENT address defined below. If credentials are not
 * configured the function simply resolves without sending. Nodemailer
 * is used for the email transport.
 */
const RECIPIENT = process.env.RECIPIENT || 'nekrylov.ln@phystech.edu';
async function sendMail(subject, text) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT) || 465;

  // Only attempt to send if credentials are defined
  if (!user || !pass) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: user,
      to: RECIPIENT,
      subject,
      text,
    });
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

// Route handler generator for form submissions
const handleForm = (type) => async (req, res) => {
  const data = req.body;
  // Log the submission for local debugging
  logSubmission(type, data);
  // Build a plain text message
  let message = `New ${type} submission:\n`;
  Object.keys(data).forEach(key => {
    message += `${key}: ${data[key]}\n`;
  });
  // Attempt to send email
  await sendMail(`${type} submission`, message);
  // Respond to client
  res.json({ success: true });
};

// Define API endpoints for each form type
app.post('/api/test', handleForm('Test'));          // for testing requests
app.post('/api/collaboration', handleForm('Collaboration')); // for collaboration/investor requests
app.post('/api/purchase', handleForm('Purchase'));  // for purchase interest requests

// Fallback route to serve index.html for unmatched GET requests (useful for direct links)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Cool Deal server is running on port ${port}`);
});