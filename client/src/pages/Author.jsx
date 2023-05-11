import { Grid, Typography, Snackbar, Alert, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { PageLayout, Context } from '../Components/PageLayout'

import { BookTab } from '../Components/LDContent'

function Highlight({ setData }){
    const author = useContext(Context).username;

    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={12}>
                <Typography 
                    variant="h3" 
                    sx={{ pt: "5px", pl: "8.5%", fontVariantCaps: "all-petite-caps" }}
                > {author} </Typography>
            </Grid>
            <Grid item xs={10} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Typography>Sort By</Typography>
                <Button variant="outlined" 
                    sx={{ borderRadius: "25px", m: "5px", ml: "15px" }}
                    onClick={() => setData('hotRank')}
                >Hot</Button>
                <Button variant="outlined" 
                    sx={{ borderRadius: "25px", m: "5px" }}
                    onClick={() => setData('popRank')}
                >Popular</Button>
                <Button variant="outlined" 
                    sx={{ borderRadius: "25px", m: "5px" }}
                    onClick={() => setData('pub_date')}
                >New</Button>
                <Button variant="outlined" 
                    sx={{ borderRadius: "25px", m: "5px" }}
                    onClick={() => setData('totalRating')}
                >Highest Rated</Button>
            </Grid>
        </Grid>
    )
}

function Booklist({ sortType }) {
    const books = useContext(Context).book_id;
    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "" });

    const [Feed, setFeed] = useState(books);

    const compareFnc = (a, b) => {
        return a[sortType] < b[sortType] ? 1 : -1;
    }

    useEffect(() => {
        setFeed((prevFeed) => [...prevFeed].sort(compareFnc))
        console.log(Feed)
    }, [sortType])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }

    return (
        <Grid container spacing={5} sx={{ pb: "1%" }}>
            {Feed?.map((book) => <BookTab info={book} />)}
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
    const [sortType, setSortType] = useState('pub_date')
    
    return (
        <PageLayout 
            url={`/author/api/${author}`}
            elem={<Highlight setData={setSortType}/>}
            gridElem={<Booklist sortType={sortType}/>}
        />
    )
    
}