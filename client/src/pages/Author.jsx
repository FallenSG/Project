import { Grid, Typography, Snackbar, Alert } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { PageLayout, Context } from '../Components/PageLayout'

import { BookTab } from '../Components/LDContent'

function Highlight(){
    const author = useContext(Context).username;

    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}>
                <Typography variant="h3" sx={{ p: "5px 0" }}> {author} </Typography>
            </Grid>
        </Grid>
    )
}

function Booklist() {
    const books = useContext(Context).book_id;
    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "" });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }

    return (
        <Grid container spacing={5}>
            {books.map((book) => <BookTab info={book} />)}
            <Snackbar
                open={snackCont.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackCont.msg}
                sx={{ width: { sm: "45vw" } }}
            >
                <Alert onClose={handleClose} severity={snackCont.severity} sx={{ width: '100%' }}>
                    {snackCont.msg}
                </Alert>
            </Snackbar>;
        </Grid>
    )
}


export default function Author() {
    const author = useLocation().pathname.split('/')[2];
    
    return (
        <PageLayout 
            url={`/author/api/${author}`}
            elem={<Highlight />}
            gridElem={<Booklist />}
        />
    )
    
}