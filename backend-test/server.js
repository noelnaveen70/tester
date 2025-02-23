const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
    "mongodb+srv://user100:mongodb100@noel100.o5yit.mongodb.net/otp?retryWrites=true&w=majority"
).then(() => {
    console.log("Connection established to DB");
}).catch(() => {
    console.log("Not Connected");
})

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: '5m', default: Date.now },
});
const OTP = mongoose.model('otp', otpSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noelnaveen01@gmail.com',
    pass: 'pgzw foct qjto vbcs',
  },
});

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Route to send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  await OTP.create({ email, otp });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
});

// Route to verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const record = await OTP.findOne({ email, otp });

  if (record) {
    await OTP.deleteOne({ _id: record._id });
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




//noel