import { useState } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function PasswordField({ autoFocus, label, placeholder, inputRef }){
    const [ showPassword, setShowPassword ] = useState(false);

    return (
        <TextField 
            autoFocus={autoFocus}
            placeholder={placeholder}
            label={label}
            inputRef={inputRef}
            type={ showPassword ? 'text': 'password' }
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}
