import AppForm from '../Components/AppForm'
import AppFormNav from '../Components/AppFormNav'
import { Box, Button, Typography, TextField, Link } from "@mui/material";

export default function Signup() {
  return (
    <>
        <AppFormNav />
        <AppForm>
            <Typography variant="h3" gutterBottom marked="center" align="center">
                Sign Up
            </Typography>

            <Typography variant="body2" align="center">
                <Link
                    href="/sign_in"
                    align="center"
                    underline="always"
                >
                    Already have an account?
                </Link>
            </Typography>

            <Box component="form" method="post" action="/sign_up" sx={{ mt: 6 }}>
                <TextField
                    autoFocus
                    label="Username"
                    name="username"
                />

                <TextField
                    autoComplete="mobile"
                    autoFocus
                    label="Mobile No."
                    name="mobile"
                />

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

                <Button sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
            </Box>

        </AppForm>
    </>
  )
}
