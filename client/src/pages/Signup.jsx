import AppForm from '../Components/AppForm'
import { Box, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

import PasswordField from '../Components/PasswordField';

export default function Signup() {
    const loc = useLocation().pathname;
    const username = useRef(null),
        email = useRef(null),
        password = useRef(null);

    const getParams = () => {
        return {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        }
    }

    return (
        <AppForm
            navbar="notAuth"
            title="Sign Up"
            underTitle={<Link href="/sign_in">Already have an account?</Link>}
            buttonText="Sign Up"
            url={loc}
            getParams={getParams}
        >
            <Box sx={{ mt: 4 }}>
                <TextField
                    autoFocus
                    label="Username"
                    inputRef={username}
                />

                <TextField
                    autoComplete="email"
                    label="Email"
                    inputRef={email}

                />

                <PasswordField 
                    label="Password"
                    inputRef={password}
                />
            </Box>
        </AppForm>
    )
}
