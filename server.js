// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000; // or any port you prefer

// Allow all origins (for development)
app.use(cors());

// OR if you want to allow only 127.0.0.1:5500:
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'], // jese method use ho rahe ho
  credentials: true
}));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Set up Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // OR use 'Yahoo', 'Outlook', or custom SMTP
    auth: {
      user: 'umardev032@gmail.com',         // 🔁 Replace with your email
      pass: 'vcqp nlbk yqka fkhi'   // 🔁 Use app-specific password for Gmail
    }
  });

  const mailOptions = {
    from: email,
    to: 'umarofficial404@gmail.com', // 🔁 Replace with your own email (where you want to receive messages)
    subject: 'New Form Submission from Website',
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
   if (err) {
  console.error('Error sending email:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.'
  });
} else {
  console.log('Email sent:', info.response);
  res.status(200).json({
    success: true,
    message: 'Message sent successfully!'
  });
}

  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
