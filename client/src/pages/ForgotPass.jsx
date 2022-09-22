import AppForm from '../Components/AppForm'
import { Box, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react'
import axios from 'axios'


export default function ForgotPass() {
    const loc = useLocation().pathname;
    const mailRef = useRef(null);
    const reqHandler = async (callback) => {
        const email = mailRef.current.value;
        if(email){
            await callback();
            const resp = await axios.post(loc, {email})
            return resp;
        }
    }

    return (
        <AppForm
            navbar="notAuth"
            title="forgot your password?"
            underTitle="Enter your email address below and we'll
                send you a link to reset your password."
            buttonText="Send Reset Link"
            customHandler={reqHandler}
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
