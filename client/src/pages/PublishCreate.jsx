import { useState, useEffect } from 'react'
import { Paper, Grid, Button, TextField } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PageLayoutOverload } from '../Components/PageLayout'

function Comp() {
    const [value, setValue] = useState(''); 
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ['blockquote', 'code-block'],
            ["clean"]
        ]
    }

    return (
        <Paper sx={{ mt: "5%", backgroundColor: "#f6f7fc" }}>
            <Grid container spacing={2} columns={14} sx={{ justifyContent: "center" }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter Chapter Title..."
                    />
                </Grid>
                <Grid item xs={13}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        placeholder="Compose an epic...."
                        value={value}
                        onChange={setValue} />
                </Grid>
            </Grid>
        </Paper>
    )

}

export default function PublishCreate() {
    return (
        <PageLayoutOverload
            gridElem={<Comp />}
            columns={16}
            gridXs={15}
        />
    )
}