import AppForm from '../Components/AppForm'
import { Box, TextField, Button } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef, useContext } from 'react';
import axios from 'axios';

import { PageLayout, Context} from '../Components/PageLayout';

function Form(){
    const Book = useContext(Context);

    const loc = useLocation().pathname;
    const img_val = useRef(null),
        title_val = useRef(null),
        isbn_val = useRef(null),
        genre_val = useRef(null),
        summary_val = useRef(null);

    const reqHandler = async (callback) => {
        const img = img_val.current.value,
            title = title_val.current.value,
            isbn = isbn_val.current.value,
            genre = genre_val.current.value,
            summary = summary_val.current.value;

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
            customHandler={reqHandler}
        >
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Book Cover
                    <input
                        ref={img_val}
                        type="file"
                        hidden
                    />
                </Button>

                <TextField
                    required={false}
                    label={Book.title}
                    inputRef={title_val}
                    helperText="Title"
                />

                <TextField
                    required={false}
                    label={Book.isbn}
                    inputRef={isbn_val}
                    helperText="ISBN"
                />

                <TextField
                    required={false}
                    multiline
                    rows={4}
                    label={Book.summary}
                    inputRef={summary_val}
                    helperText="Summary"
                />

                <TextField
                    required={false}
                    label={Book.genre}
                    inputRef={genre_val}
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
            nav="none"
            url={`/book/api/${bookId}`}
            elem={<Form />}
            failureMsg="Error"
        />
    )
}