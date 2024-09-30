import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Link, Modal } from '@mui/material';

export default function LoginFormPopup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log({ email, password, rememberMe });
    setOpen(false); // Close modal after submitting the form
  };

  return (
    <div>
      {/* Button to open the login form */}
      <Button onClick={handleOpen} variant="contained" className="sub" sx={{ backgroundColor: '#d4af6e', '&:hover': { backgroundColor: '#bb9559' } }}>
        Open Login Form
      </Button>

      {/* Modal containing the login form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-form"
        aria-describedby="login-form-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" id="Log" sx={{ marginBottom: 1 }}>
            Log in
          </Typography>
          <Typography id="sub" sx={{ marginBottom: 3 }}>
            or create an account. <Link href="signup.html">sign up</Link>
          </Typography>

          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              sx={{ marginBottom: 1 }}
            />
            <Link href="/" underline="hover" sx={{ display: 'block', marginBottom: 2 }}>
              Forgot password?
            </Link>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
              sx={{ marginBottom: 3 }}
            />
            <Button type="submit" className="sub" variant="contained" fullWidth sx={{ backgroundColor: '#d4af6e', '&:hover': { backgroundColor: '#bb9559' } }}>
              Log in
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

const modalStyle = {
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 3,
  textAlign: 'center',
  boxShadow: 24,
};
