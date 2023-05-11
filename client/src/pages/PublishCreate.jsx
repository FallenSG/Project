import PublishForm from '../Components/PublishForm'
import { TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';

import GenreField from '../Components/GenreField'
import ImgPreview from '../Components/ImgPreview';

export default function CreateBook() {
    const loc = useLocation().pathname;

    const title = useRef(null),
        isbn = useRef(null),
        summary = useRef(null);

    const getParams = () => {
        const formData = new FormData();

        formData.append('bookCover', imgFile.file);
        formData.append('title', title.current.value);
        formData.append('isbn', isbn.current.value);
        formData.append('genre', genre);
        formData.append('summary', summary.current.value);

        return formData;
    }

    const [imgFile, setImgFile] = useState({ shown: '/bookCover/defCover', file: "" });
    const [ genre, setGenre ] = useState("")

    return (
        <PublishForm
            buttonText="Publish"
            url={loc}
            getParams={getParams}
        >   
            <ImgPreview imgFile={imgFile} setImgFile={setImgFile} />

            <TextField
                name="title"
                label="Title"
                required={true}
                inputRef={title}
            />

            <TextField
                name="isbn"
                helperText="ISBN"
                inputRef={isbn}
            />

            <GenreField setGenreVal={setGenre}/>
            
            <TextField
                name="summary"
                multiline
                rows={4}
                placeholder="Write your Epic!!"
                inputRef={summary}
                helperText="Summary"
            />

        </PublishForm>
    )
}