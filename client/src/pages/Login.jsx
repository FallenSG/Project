import { Box, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

import AppForm from '../Components/AppForm'
import PasswordField from '../Components/PasswordField';

function Login() {
  const loc = useLocation().pathname;
  const mailRef = useRef(null), passRef = useRef(null);

  const getParams = () => {
    return {
      email: mailRef.current.value,
      password: passRef.current.value
    }
  }

  return (
    <AppForm
      navbar="notAuth"
      title="Sign In"
      underTitle={<>Not a member yet? < Link href="/sign_up">Sign Up Now</Link></>}
      buttonText="Log In"
      url={loc}
      getParams={getParams}
      bottomPart={<Link href="/forgot-password" underline="always">
        Forgot password?
      </Link>}
    >
      <Box sx={{ mt: 4 }}>
        <TextField
          autoComplete="email"
          type="email"
          autoFocus
          label="Email"
          inputRef={mailRef}
        />

        <PasswordField 
          label="Enter Password"
          inputRef={passRef}
        />
      </Box>
    </AppForm>
  )
}

export default Login
