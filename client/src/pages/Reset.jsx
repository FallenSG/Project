import AppForm from '../Components/AppForm'
import { Box } from "@mui/material";
import { useRef } from 'react';

import PasswordField from '../Components/PasswordField'

export default function Reset(){
    const old_pass = useRef(null), 
        new_pass = useRef(null), 
        new_passRe = useRef(null);

    const getParams = () => {
        return {
            oldPass: old_pass.current.value,
            newPass: new_pass.current.value
        }
    }

    return (
        <AppForm
            navbar="non"
            title="Reset Your Password"
            buttonText="Reset"
            url="/reset-password"
            getParams={getParams}
        >
            <Box sx={{ mt: 4 }}>
                <PasswordField 
                    autoFocus
                    label="Enter Current Password"
                    inputRef={old_pass}
                />
                <br />

                <PasswordField
                    label="Enter New Password"
                    inputRef={new_pass}
                />
                <br/>
                <PasswordField
                    label="Re-type New Password"
                    inputRef={new_passRe}
                />
            </Box>
        </AppForm>
    )

}
