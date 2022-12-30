import AppForm from '../Components/AppForm'
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

import PasswordField from '../Components/PasswordField'

export default function ForgotPass2() {
    const loc = useLocation().pathname;
    const pass = useRef(null), confPass = useRef(null);

    const getParams = () => {
        return {
            password: pass.current.value,
            confPassword: confPass.current.value
        }
    }

    return (
        <AppForm 
            navbar="non" 
            title="enter your new password"
            buttonText="Reset Password"
            url={loc}
            getParams={getParams}
        >
            <Box sx={{ mt: 6 }}>
                <PasswordField 
                    autoFocus
                    label="Enter Password"
                    inputRef={pass}
                />

                <PasswordField
                    label="Confirm Password"
                    inputRef={confPass}
                />
            </Box>
        </AppForm>
    )
}
