import AppForm from '../Components/AppForm'
import { Box, Button, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';

function Login() {
  const loc = useLocation().pathname;
  return (
    <AppForm
      navbar="notAuth"
      title="Sign In"
      underTitle={<>Not a member yet? < Link href="/sign_up">Sign Up Now</Link></>}
      bottomPart={<Link href="/forgot-password" underline="always">
        Forgot password?
      </Link>}
    >
      <Box component="form" method="post" action={loc} sx={{ mt: 4 }}>
        <TextField
          autoComplete="email"
          autoFocus
          label="Email"
          name="email"
        />
        <TextField
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
        />

        <Button type="submit" sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>
      </Box>
    </AppForm>
  )
}

export default Login
