import AppForm from '../Components/AppForm'
import { Box, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react'

export default function ForgotPass() {
    const loc = useLocation().pathname;
    const mailRef = useRef(null);

    const getParams = () => {
        return {
            email: mailRef.current.value
        }
    }
    return (
        <AppForm
            navbar="notAuth"
            title="forgot your password?"
            underTitle="Enter your email address below and we'll
                send you a link to reset your password."
            buttonText="Send Reset Link"
            url={loc}
            getParams={getParams}
        >
            <Box sx={{ mt: 6 }}>
                <TextField
                    autoFocus
                    label="Email"
                    inputRef={mailRef}
                />
            </Box>

        </AppForm>
    )
}
