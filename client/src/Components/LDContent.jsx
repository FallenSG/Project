import axios from 'axios'
import Loading from '../Components/Loading'
import { useNavigate } from "react-router-dom";
import { Star, AddCircleOutlined } from '@mui/icons-material'
import { Grid, Link, Typography, Button, Stack, Snackbar, Alert } from '@mui/material'  
import { useState, useEffect, useRef, useCallback } from 'react';

const dispStyle = {
    fontSize: { xs: "16px", md: "20px" },
    fontWeight: "500",
    color: "black",
    cursor: "pointer",
    fontVariantCaps: "all-petite-caps"
}


export function BookTab({ info, inRef, setSnackCont }) {
    let rating = (info.totalRating / info.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const navg = useNavigate();

    const handleAdd = () => {
        axios.post('/library/addItem', { id: info._id })
            .then(data => {
                if (data.status === 200)    
                    setSnackCont({ open: true, msg: "Added...", severity: "success" })
            })
            .catch(err => setSnackCont({ open: true, msg: err.response.data, severity: "error" }));
    }


    return (
        <Grid
            item container
            ref={inRef} key={info._id} xs={6}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
        >
            <img
                onClick={() => navg(`/book/${info._id}`)}
                src={info.img}
                style={{
                    height: "30vh",
                    aspectRatio: "0.8",
                    resize: "auto",
                    objectFit: "scale-down",
                    cursor: "pointer"
                }}
                alt='Not Found'
                loading="lazy"
            />
            <Grid item xs={8}>
            <Stack sx={{ justifyContent: "none" }}>
                <Link
                    href={`/book/${info._id}`}
                    underline="hover"
                    sx={{ ...dispStyle }}
                > {info.title} </Link> <br />

                <Typography 
                    sx={{ 
                        display: { xs: "none", sm: "flex" },
                        color: "darkslategrey" 
                    }}
                    variant="subtitle2"
                    noWrap
                > {info.summary} </Typography>

                <Stack direction="row" spacing={0.25}>
                    <Button
                        sx={{ width: "fit-content" }}
                        startIcon={<Star />}
                        size="small"
                        disabled
                    > {rating} </Button>

                    <Button
                        startIcon={<AddCircleOutlined />}
                        onClick={handleAdd}
                        size="small"
                    > Add </Button>
                </Stack>
            </Stack>
            </Grid>
        </Grid>
    )
}

export function Booklist({ url }){
    const [page, setPage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [content, setContent] = useState([]);
    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "warning" });

    useEffect(() => {
        setLoading(true);

        axios.get(url,
            { params: { page } }
        )
            .then(resp => {
                setContent(prevContent => [...prevContent, ...resp.data[0].books])
                setLoading(false);
                setHasMore(resp.data[0].remainingDoc[0].count > 15);
            })
            .catch(err => console.log(err));
    }, [page])

    const observer = useRef();
    const lastBookElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }

    return (
        <>
            <Grid container spacing={3}>
                {content.map((book, i) => {
                    if (content.length - 5 === i) {
                        return <BookTab inRef={lastBookElementRef} info={book} setSnackCont={setSnackCont} />
                    } else {
                        return <BookTab info={book} setSnackCont={setSnackCont} />
                    }
                })}
                {loading && <Loading />}
            </Grid>

            <Snackbar 
                open={snackCont.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackCont.msg}
                sx={{ width: {sm: "45vw" } }}
            >
                <Alert onClose={handleClose} severity={snackCont.severity} sx={{ width: '100%' }}>
                    {snackCont.msg}
                </Alert>
            </Snackbar>
        </>
    )
}
