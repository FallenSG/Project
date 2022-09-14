import AppFormPopup from '../Components/AppFormPopup'
import AppForm from '../Components/AppForm'
import { Box, Button, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom'

export default function Sample() {
    const loc = useLocation().pathname;
    return (
        <AppForm
            navbar="notAuth"
            title="forgot your password?"
            underTitle="Enter your email address below and we'll
                send you a link to reset your password."
        >
            <AppFormPopup />
            <Box component="form" method="post" action={loc} sx={{ mt: 6 }}>
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
    )
}
