import PublishForm from '../Components/PublishForm'
import { Box, TextField, Button, Paper, Stack,
    Autocomplete, Chip
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef, useContext, useState } from 'react';

import { PageLayout, Context } from '../Components/PageLayout';

const Genre = ["Urban", "Eastern", "Games", "Fantasy", "Sci-Fi", "Horror", "Sports", "Action", "War", "Realistic", "History", "Mystery", "Drama"];

function Form() {
    const Book = useContext(Context);
    const loc = useLocation().pathname;

    const [imgFile, setImgFile] = useState({shown: Book.img, file:""})
    const [genreVal, setGenreVal] = useState("");

    const img_val = useRef(null),
        title_val = useRef(null),
        isbn_val = useRef(null),
        summary_val = useRef(null);

    const getParams = () => {
        const formData = new FormData();

        const data = {
            title: title_val.current.value,
            isbn: isbn_val.current.value,
            genre: genreVal,
            summary: summary_val.current.value
        }

        if(imgFile.file) formData.append('bookCover', imgFile.file);
        if(data.title) formData.append('title', data.title);
        if(data.isbn) formData.append('isbn', data.isbn);
        if(data.genre) formData.append('genre', data.genre);
        if(data.summary) formData.append('summary', data.summary);

        return formData
    }

    return (
        <PublishForm
            buttonText="Save Changes"
            url={loc}
            getParams={getParams}
        >
            <Paper sx={{ width: "fit-content", mb: "16px", p: 0 }}>
                <img 
                    style={{
                        height: "35vh",
                        aspectRatio: "0.8",
                        resize: "auto",
                        objectFit: "scale-down"
                    }}
                    src={imgFile.shown}
                />
            </Paper>

            <Button
                variant="contained"
                component="label"
                sx={{ width: "fit-content" }}
            >
                Upload Book Cover
                <input
                    name="bookCover"
                    ref={img_val}
                    onChange={(e) => { 
                        setImgFile({ shown: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
                    }}
                    type="file"
                    hidden
                />
            </Button>

            <TextField
                name="title"
                placeholder={Book.title}
                inputRef={title_val}
                helperText="Title"
            />

            <TextField
                name="isbn"
                placeholder={Book.isbn ? Book.isbn : "Enter ISBN If Exists"}
                inputRef={isbn_val}
                helperText="ISBN"
            />

            <Autocomplete
                multiple
                onChange={(e, val) => setGenreVal(val) }
                options={Genre}
                defaultValue={Book.genre}
                filterSelectedOptions
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip 
                            variant="outlined" 
                            label={option} 
                            {...getTagProps({ index })} 
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        helperText="Genre Tags"
                        label="Genre"
                    />
                )}
            />

            <TextField
                name="summary"
                multiline
                rows={4}
                placeholder={Book.summary}
                inputRef={summary_val}
                helperText="Summary"
            />
        </PublishForm>
    )
}

export default function PublishModify() {
    const bookId = useLocation().pathname.split('/')[3];

    return (
        <PageLayout
            nav="publish"
            url={`/book/api/${bookId}`}
            gridElem={<Form />}
            failureMsg="Error"
        />
    )
}