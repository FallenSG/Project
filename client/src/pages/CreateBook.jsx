import AppForm from '../Components/AppForm'
import { Box, TextField, Button, TextareaAutosize } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

export default function CreateBook(){
    const img = useRef(null),
        title = useRef(null),
        isbn = useRef(null),
        genre = useRef(null),
        summary = useRef(null);

    const reqHandler = async(callback) => {
        const value1 = img.current.value,
            value2 = title.current.value,
            value3 = isbn.current.value,
            value4 = genre.current.value,
            value5 = summary.current.value;

            if(value2 && value4){
                await callback();
                // const resp = await 
            }
    }

    return (
        <AppForm
            navbar="auth"
            title="Publish Your Work"
            buttonText="Publish"
        >
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Book Cover
                    <input
                        type="file"
                        hidden
                    />
                </Button> 

                <TextField
                    label="Title"
                    inputRef={title}
                />

                <TextField
                    required={false}
                    label="ISBN"
                    helperText="If Available"
                    inputRef={isbn}
                />

                <TextField
                    required={false}
                    helperText="Default: Summary need to be updated plz check after sometime"
                    label="Summary"
                    inputRef={summary}
                />

                <TextField
                    label="Genre"
                    inputRef={genre}
                />
            </Box>    
        </AppForm> 
    )
}