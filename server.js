// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000; // hosting ke liye env port

// Allow all origins (for development)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend API is running 🚀' });
});

// Handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields.'
    });
  }

  // Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'umardev032@gmail.com',
      pass: 'vcqp nlbk yqka fkhi' // app password
    }
  });

  const mailOptions = {
    from: email,
    to: 'umarofficial404@gmail.com',
    subject: 'New Form Submission from Website',
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Email send error:', err);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
    console.log('✅ Email sent:', info.response);
    res.json({ success: true, message: 'Message sent successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});
