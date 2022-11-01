import AppForm from '../Components/AppForm'
import { Box, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios'


function Login() {
  const loc = useLocation().pathname;
  const mailRef = useRef(null), passRef = useRef(null);

  const reqHandler = async (callback) => {
    const email = mailRef.current.value,
      password = passRef.current.value;

    if (email && password) {
      await callback();
      const resp = await axios.post(loc, { email, password })
      return resp;
    }
  }

  return (
    <AppForm
      navbar="notAuth"
      title="Sign In"
      underTitle={<>Not a member yet? < Link href="/sign_up">Sign Up Now</Link></>}
      buttonText="Log In"
      customHandler={reqHandler}
      bottomPart={<Link href="/forgot-password" underline="always">
        Forgot password?
      </Link>}
    >
      <Box sx={{ mt: 4 }}>
        <TextField
          autoComplete="email"
          autoFocus
          label="Email"
          inputRef={mailRef}
        />
        <TextField
          autoComplete="current-password"
          label="Password"
          type="password"
          inputRef={passRef}
        />
      </Box>
    </AppForm>
  )
}

export default Login
