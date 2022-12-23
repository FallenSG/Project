import { Grid, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { BookTab } from '../Components/LDContent'
import { useContext } from 'react'
import { PageLayout, Context } from '../Components/PageLayout'

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

    return (
        <Grid container spacing={5}>
            {books.map((book) => <BookTab info={book} />)}
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