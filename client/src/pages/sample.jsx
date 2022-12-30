import { useState } from 'react'
import { Grid, Paper, TextField, Button, Box } from '@mui/material'
import axios from 'axios'

import AppForm from '../Components/AppForm'

export default function Sample(){

    const handleSubmit = (e) => {
        axios.post('/sample', { email: "something", password: "something" })
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
    }

    return (
        <AppForm 
            navbar="auth"
            title="Sample form"
            customHandler={handleSubmit}
            buttonText="Submit"
        >
            <Box sx={{ mt:3 }}>
                <TextField required type="email" label="email" /> <br/>
                <TextField required type="password" label="Enter Password" /> <br/>
            </Box>
        </AppForm>
    )
}