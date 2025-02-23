import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from './welcome';  // Adjust the path to your actual Welcome component
import { Box, TextField, Button, Typography } from '@mui/material';

function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await axios.post('https://tester-8wvw.onrender.com/send-otp', { email });
      setShowOtpForm(true);
      alert('OTP sent to your email!');
    } catch (error) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.post('https://tester-8wvw.onrender.com/verify-otp', { email, otp });
      alert('OTP verified successfully!');
      navigate('/welcome');  // Navigate to the welcome page
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f0f0" // Optional background color
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        width="100%"
        maxWidth={400}
      >
        {!showOtpForm ? (
          <>
            <Typography variant="h5" gutterBottom>Enter your Email</Typography>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendOTP}
              sx={{ mt: 2 }}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>Enter OTP</Typography>
            <TextField
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyOTP}
              sx={{ mt: 2 }}
            >
              Verify OTP
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router> 
  );
}
  