import AppForm from '../Components/AppForm'
import AppFormNav from '../Components/AppFormNav'
import { Box, Button, Typography, TextField, Link } from "@mui/material";

export default function ForgotPass() {
    return (
        <>
            <AppFormNav />
            <AppForm>
                <Typography variant="h3" gutterBottom marked="center" align="center">
                    Forgot your password?
                </Typography>

                <Typography variant="body2" align="center">
                    {"Enter your email address below and we'll " +
                        'send you a link to reset your password.'}
                </Typography>

                <Box component="form" method="post" action="/forgot-password" sx={{ mt: 6 }}>
                    <TextField
                        autoFocus
                        label="Email"
                        name="email"
                    />

                    <Button sx={{ mt: 3, mb: 2 }}>
                        Send Reset Link
                    </Button>
                </Box>

            </AppForm>
        </>
    )
}
