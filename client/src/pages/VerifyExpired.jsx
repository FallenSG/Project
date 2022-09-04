import AppForm from '../Components/AppForm'
import { Box, Button, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function VerifyExpired() {
    const loc = useLocation().pathname;
    return (
        <AppForm
            navbar="notAuth"
            title="token expired"
            underTitle="It Seems like your verification token expired.
                Please enter your email id to recieve new token."

        >
            <Box component="form" method="post" action={loc} sx={{ mt: 6 }}>
                <TextField
                    autoFocus
                    label="Enter Email"
                    name="email"
                />

                <Button sx={{ mt: 3, mb: 2 }}>
                    Resend Verification Link
                </Button>
            </Box>

        </AppForm>
    )
}
