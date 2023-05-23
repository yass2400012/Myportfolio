const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fr', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index_fr.html'));
});

app.post('/', async (req, res) => {
  const { fullName, email, phoneNumber, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUsername,
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: 'PortfolioAPP',
      to: emailUsername,
      subject: subject,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\n\nMessage:\n${message}`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
    res.send('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
