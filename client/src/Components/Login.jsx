import { Button, Grid, InputBase, Stack, TextField } from '@mui/material'
import { Box, styled } from '@mui/system'
import React from 'react'

const Form = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    direction: 'rows',
    margin: "25% 25%",
    // padding: "30% 30%"
})

function Login() {
  return (
    // <Stack
    //     component='form'
    //     sx={{
    //         '& .MuiTextField-root': { m: 1, width: '25ch' },
    //     }}
    //     noValidate
    //     autoComplete="off"
    // >
    //     <TextField id="filled-basic" label="Filled" variant="filled" multiline/>
    //     <TextField id="filled-basic" label="Filled" variant="filled" multiline/>
    // </Stack>

    <Stack
        sx = {{
            backgroundColor: "skyblue",
            margin: "25% 25%",
            display: "flex",
            alignContent: "center", 
            justifyContent: "center"
        }}

        spacing = {3}
    >
        <TextField id="filled-basic" label="Email" variant="outlined" multiline/>
        <TextField id="filled-basic" label="Password" variant="outlined" multiline/>

        <Button>Login</Button>
    </Stack>
  )
}

export default Login