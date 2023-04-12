import PublishForm from '../Components/PublishForm'
import { TextField, Button, Paper } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef, useContext, useState } from 'react';

import { PageLayout, Context } from '../Components/PageLayout';
import GenreField from '../Components/GenreField'
import ImgPreview from '../Components/ImgPreview'

function Form() {
    const Book = useContext(Context);
    const loc = useLocation().pathname;

    const [imgFile, setImgFile] = useState({shown: Book.img, file:""})
    const [genreVal, setGenreVal] = useState("");

    const title_val = useRef(null),
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

        return formData;
    }

    return (
        <PublishForm
            buttonText="Save Changes"
            url={loc}
            getParams={getParams}
        >
            <ImgPreview imgFile={imgFile} setImgFile={setImgFile} />

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

            <GenreField defaultVal={Book.genre} setGenreVal={setGenreVal}/>

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
            nav="none"
            url={`/book/api/${bookId}`}
            elem={<Form />}
            failureMsg="Error"
        />
    )
}