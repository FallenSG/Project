import AppForm from '../Components/AppForm'
import { Box, TextField, Button } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

export default function CreateBook(){
    const loc = useLocation().pathname;

    const img = useRef(null),
        title = useRef(null),
        isbn = useRef(null),
        genre = useRef(null),
        summary = useRef(null);

    const getParams = () => {
        console.log(
            img.current.value,
            title.current.value
        )

        return {
            img: img.current.value,
            title: title.current.value,
            isbn: isbn.current.value,
            genre: genre.current.value,
            summary: summary.current.value
        }
    }

    return (
        <AppForm
            navbar="auth"
            title="Publish Your Work"
            buttonText="Publish"
            url={loc}
            getParams={getParams}
        >
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Book Cover
                    <input
                        ref={img}
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