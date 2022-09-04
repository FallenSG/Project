import AppForm from '../Components/AppForm'
import { Box, Button, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function Signup() {
    const loc = useLocation().pathname;
    return (
        <AppForm
            navbar="notAuth"
            title="Sign Up"
            underTitle={<Link href="/sign_in">Already have an account?</Link>}
        >
            <Box component="form" method="post" action={loc} sx={{ mt: 4 }}>
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
    )
}
