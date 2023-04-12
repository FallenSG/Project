import { useState, useEffect } from 'react'
import { Paper, Grid, TextField } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PageLayoutOverload } from '../Components/PageLayout'
import PubPath from '../Components/PubPath'
import PubNavbar from '../Components/PubNavbar'

function Comp({ setVal, val }) {
    const [value, setValue] = useState(''); 
    const [title, setTitle] = useState('');

    useEffect(() => {
        setVal({ title: title, content: value })
    }, [value, title])

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
                        onChange={(event) => setTitle(event.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        autoComplete='false'
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

export default function PublishChapCreate() {
    const [chapVal, setChapVal] = useState({ title: "", content: "" })

    return (
        <PageLayoutOverload
            nav="none"
            elem={<PubNavbar val={chapVal} />}
            gridElem={<Comp setVal={setChapVal} val={chapVal} />}
            columns={16}
            gridXs={15}
        />
    )
}