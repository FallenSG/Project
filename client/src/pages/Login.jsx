import AppForm from '../Components/AppForm'
import { Box, Button, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'


function Login() {
  const loc = useLocation().pathname;
  const mailRef = useRef(null), passRef = useRef(null);
  const [isSending, setIsSending] = useState(false)

  const reqHandler = () => {
    setIsSending(true);
    axios.post(loc, {
      email: mailRef.current.value,
      password: passRef.current.value
    }).then((resp) => {
      console.log(resp);
      setIsSending(false);
    })
    // console.log(mailRef.current.value, passRef.current.value)
  }
  
  return (
    <AppForm
      navbar="notAuth"
      title="Sign In"
      underTitle={<>Not a member yet? < Link href="/sign_up">Sign Up Now</Link></>}
      bottomPart={<Link href="/forgot-password" underline="always">
        Forgot password?
      </Link>}
    >
      <Box sx={{ mt: 4 }}>
        <TextField
          autoComplete="email"
          autoFocus
          label="Email"
          name="email"
          inputRef={mailRef}
        />
        <TextField
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
          inputRef={passRef}
        />

        <Button type="submit" onClick={reqHandler} disabled={isSending} sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>
      </Box>
    </AppForm>
  )
}

export default Login
