import AppForm from '../Components/AppForm'
import AppFormNav from '../Components/AppFormNav'
import { Box, Button, Typography, TextField, Link } from "@mui/material";
import { GutterBottom } from '../Components/GutterDivider'

export default function Signup() {
  return (
    <>
        <AppFormNav />
        <AppForm>
            <Typography variant="h3" marked="center" align="center">
                Sign Up
            </Typography>

            <GutterBottom />

            <Typography variant="body2" align="center">
                <Link href="/sign_in">
                    Already have an account?
                </Link>
            </Typography>

            <Box component="form" method="post" action="/sign_up" sx={{ mt: 4 }}>
                <TextField
                    autoFocus
                    label="Username"
                    name="username"
                />

                <TextField
                    autoComplete="mobile"
                    label="Mobile No."
                    name="mobile"
                />

                <TextField
                    autoComplete="email"
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
