import AppForm from '../Components/AppForm'
import { Box, TextField, Button, TextareaAutosize } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef, useContext } from 'react';
import axios from 'axios';

import { PageLayout, Context} from '../Components/PageLayout';

function Form(){
    const Book = useContext(Context);

    const loc = useLocation().pathname;
    const img = useRef(null),
        title = useRef(null),
        isbn = useRef(null),
        genre = useRef(null),
        summary = useRef(null);

    const reqHandler = async (callback) => {
        const img = img.current.value,
            title = title.current.value,
            isbn = isbn.current.value,
            genre = genre.current.value,
            summary = summary.current.value;

        if (title && genre) {
            await callback();
            const resp = await axios.post(loc, {
                img, title, isbn, genre, summary
            })

            return resp;
        }
    }

    return (
        <AppForm
            navbar="auth"
            title="Modify Your Book"
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
                    required={false}
                    label={Book.title}
                    inputRef={title}
                    helperText="Title"
                />

                <TextField
                    required={false}
                    label={Book.isbn}
                    inputRef={isbn}
                    helperText="ISBN"
                />

                <TextField
                    required={false}
                    label={Book.summary}
                    inputRef={summary}
                    helperText="Summary"
                />

                <TextField
                    required={false}
                    label={Book.genre}
                    inputRef={genre}
                    helperText="Genre"
                />
            </Box>
        </AppForm>
    )
}

export default function ModifyBook() {
    const bookId = useLocation().pathname.split('/')[2];

    return (
        <PageLayout 
            url={`/book/api/${bookId}`}
            element={<Form />}
            failure={{ status: 400, msg: "Error" }}
        />
    )
}