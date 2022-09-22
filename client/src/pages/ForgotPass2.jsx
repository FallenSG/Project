import AppForm from '../Components/AppForm'
import { Box, TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

export default function ForgotPass2() {
    const loc = useLocation().pathname;
    const pass = useRef(null), confPass = useRef(null);

    const reqHandler = async(callback) => {
        const password = pass.current.value,
            confPassword = confPass.current.value;

        if(password && confPassword && password === confPassword){
            await callback();
            const resp = await axios.post(loc, { pass: password });
            return resp;
        }
    }

    return (
        <AppForm 
            navbar="non" 
            title="enter your new password"
            buttonText="Reset Password"
            customHandler={reqHandler}
        >
            <Box sx={{ mt: 6 }}>
                <TextField
                    type="password"
                    autoFocus
                    label="Enter Password"
                    inputRef={pass}
                />

                <TextField
                    type="password"
                    label="Confirm Password"
                    inputRef={confPass}
                />
            </Box>
        </AppForm>
    )
}
