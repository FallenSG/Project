import AppForm from '../Components/AppForm'
import { Box, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react'
import axios from 'axios';

export default function VerifyExpired() {
    const loc = useLocation().pathname;
    const mailRef = useRef(null);

    const reqHandler = async (callback) => {
        const email = mailRef.current.value;
        if(email){
            await callback();
            const resp = await axios.post(loc, { email });
            return resp;
        }
    }
    return (
        <AppForm
            navbar="notAuth"
            title="token expired"
            underTitle="It Seems like your verification token expired.
                Please enter your email id to recieve new token."
            buttonText="Resend Verification Link"
            customHandler={reqHandler}
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
