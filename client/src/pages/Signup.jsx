import AppForm from '../Components/AppForm'
import { Box, TextField, Link } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

export default function Signup() {
    const loc = useLocation().pathname;
    const username = useRef(null),
        mobile = useRef(null),
        email = useRef(null),
        password = useRef(null);

    const reqHandler = async(callback) => {
        const value1 = username.current.value,
            value2 = mobile.current.value, 
            value3 = email.current.value, 
            value4 = password.current.value;

        if (value1 && value2 && value3 && value4){
            await callback();
            const resp = await axios.post(loc, {
                username: value1,
                mobile: value2,
                email: value3,
                password: value4
            });

            return resp;
        }
    }

    return (
        <AppForm
            navbar="notAuth"
            title="Sign Up"
            underTitle={<Link href="/sign_in">Already have an account?</Link>}
            buttonText="Sign Up"
            customHandler={reqHandler}
        >
            <Box sx={{ mt: 4 }}>
                <TextField
                    autoFocus
                    label="Username"
                    inputRef={username}
                />

                <TextField
                    autoComplete="mobile"
                    label="Mobile No."
                    inputRef={mobile}
                />

                <TextField
                    autoComplete="email"
                    label="Email"
                    inputRef={email}

                />

                <TextField
                    inputRef={password}
                    autoComplete="current-password"
                    label="Password"
                    type="password"
                />
            </Box>
        </AppForm>
    )
}
