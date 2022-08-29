import AppForm from '../Components/AppForm'
import AppFormNav from '../Components/AppFormNav'
import { Box, Button, Typography, TextField, Link } from "@mui/material";
import { GutterBottom } from '../Components/GutterDivider'

function Login(){
  return (
    <>
      <AppFormNav />
      <AppForm>
        <Typography variant="h3" marked="center" align="center">
          Sign In
        </Typography>

        <GutterBottom />

        <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link href="/sign_up">
            Sign Up here
          </Link>
        </Typography>

        <Box component="form" method="post" action="/sign_in" sx={{ mt: 4 }}>
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

        <Typography variant="body1" align="center">
          <Link
            href="/forgot-password"
            underline="always"
          >
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </>
  )
}

export default Login
