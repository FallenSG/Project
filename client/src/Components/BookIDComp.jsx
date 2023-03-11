import {
    Box, Grid,
    Breadcrumbs,
    Snackbar, Alert,
    Stack, Typography,
    Rating, Link, Button
} from '@mui/material'
import { Flag, Add } from '@mui/icons-material';
import { useContext, useState } from 'react'
import axios from 'axios';

import { Context } from './PageLayout';

const dispStyle = {
    p: { xs: "4px 10px", sm: "8px 22px" }, 
    fontSize: { xs: "13px", sm: "15px" }
}

function Path(){
    const feed = useContext(Context);
    return (
        <Breadcrumbs sx={{ p: "24px 0 0 9%", display: { xs: "none", sm: 'block' }, fontVariantCaps: "petite-caps" }}>
            <Link href="/" underline="hover" color="inherit">Home</Link> / 
            <Link href={`/genre/${feed.genre[0]}`} underline='hover' color="inherit">{feed.genre[0]}</Link> / 
            <Typography color="black">{feed.title}</Typography>
        </Breadcrumbs>

    )
}

function Info(){
    const feed = useContext(Context);
    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "warning" });

    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const handleAdd = () => {
        axios.post('/library/addItem', { bookId: feed._id })
            .then(data => {
                if (data.statusCode === 200)
                    setSnackCont({ open: true, msg: "Added...", severity: "success" })
            })
            .catch(err => setSnackCont({ open: true, msg: err.response.data, severity: "error" }));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }


    return (
        <Stack 
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={3}
            sx={{ pl: "2%", fontVariantCaps: "petite-caps" }}
        >
            <Stack direction="column" justifyContent="space-evenly" spacing={0.5}>
                <Typography variant="h4" sx={{ pr: { xs: "0%", sm: "15%" } }}>
                    {feed.title}
                </Typography>
                <Typography sx={{ color: "#83848f" }}>
                    Author: <Link href={`/author/${feed.author_id._id}`} underline="hover">{feed.author_id.username}</Link>
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", m: 0 }}>
                    <Rating sx={{ fontSize: { xs: "20px", sm: "25px" } }} value={rating} precision={0.01} readOnly />
                    <Typography variant="h5" sx={{ pr: '5px' }}> {rating} </Typography>
                    <Typography sx={{ pr: "5px", display: { xs: "none", sm: "block" } }}> ({feed.ratingCount} ratings) </Typography>
                </Stack>
            </Stack>

            <div>
                <Stack direction="row" spacing={1}>
                    <Button
                        type="submit"
                        sx={{ borderRadius: "24px", ...dispStyle }}
                        onClick={() => {}}
                        variant="contained"
                    >Read</Button>

                    <Button
                        type="submit"
                        sx={{ borderRadius: "24px", ...dispStyle }}
                        onClick={handleAdd}
                        variant="contained"
                        startIcon={<Add />}
                    >Add to Library</Button>
                </Stack>

                <Button
                    sx={{ fontSize: "14px", mt: "3%", color: "#83848f"}}
                    onClick={() => {}}
                    startIcon={<Flag />}
                >
                    Report Story
                </Button>
            </div>

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
            </Snackbar>

        </Stack>
    )
}


export default function BookInfo() {
    const feed = useContext(Context);
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#f5f6fc" }}>
            <Path />
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                flexWrap="nowrap"
                alignItems="stretch"
                sx={{ p: "1% 0 0 7%" }}
            >
                 
                <img 
                    style={{
                        width: "25vw",
                        aspectRatio: "0.8",
                        resize: "auto",
                        objectFit: "scale-down"
                    }}
                    src={feed.img}
                /> 
                <Info /> 
            </Grid>

       </Box>
    );
}