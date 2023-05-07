import { Paper, Grid, TextField } from '@mui/material'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import PubPath from '../Components/PubPath'


export default function Editor({ setVal, val }) {
    const modules = {
        toolbar: [
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
                <Grid item xs={13}>
                    <PubPath />
                </Grid>

                <Grid item xs={12} sx={{ mt: "10px" }}>
                    <TextField
                        onChange={(event) => setVal(preVal => ({
                            ...preVal, title: event.target.value
                        }))}
                        placeholder={val.title ? val.title : "Enter Chapter Title..."}
                        fullWidth
                        variant="outlined"
                        size="small"
                        autoComplete='false'
                    />
                </Grid>
                <Grid item xs={13}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        placeholder="Compose an epic...."
                        value={val.content}
                        onChange={(newContent) => setVal(preVal => ({
                            ...preVal, content: newContent
                        }))} 
                    />
                </Grid>
            </Grid>
        </Paper>
    )

}