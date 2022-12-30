import AppForm from '../Components/AppForm'
import { Box, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react'

export default function VerifyExpired() {
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
            title="token expired"
            underTitle="It Seems like your verification token expired.
                Please enter your email id to recieve new token."
            buttonText="Resend Verification Link"
            url={loc}
            getParams={getParams}
        >
            <Box sx={{ mt: 6 }}>
                <TextField
                    autoFocus
                    label="Enter Email"
                    inputRef={mailRef}
                />
            </Box>
        </AppForm>
    )
}
