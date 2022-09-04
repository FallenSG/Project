import AppForm from '../Components/AppForm'
import { Box, Button, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function ForgotPass2() {
    const loc = useLocation().pathname;
    return (
        <AppForm navbar="non" title="enter your new password">
            <Box component="form" method="post" action={loc} sx={{ mt: 6 }}>
                <TextField
                    type="password"
                    autoFocus
                    label="Enter Password"
                    name="email"
                />

                <TextField
                    type="password"
                    label="Confirm Password"
                    name="email"
                />

                <Button sx={{ mt: 3, mb: 2 }}>
                    Reset Password
                </Button>
            </Box>
        </AppForm>
    )
}
