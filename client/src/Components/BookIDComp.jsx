import {
    Paper, Box, Grid,
    Stack, Typography,
    Rating, Link, Button, styled
} from '@mui/material'
import { Flag, Home, Add, FavoriteBorder } from '@mui/icons-material'
import { DividerVertical } from './GutterDivider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from '../Components/Loading'

const Underline = styled('i')({
    display: 'block',
    // width: '90px',
    top: '100%', 
    borderTop: '2px solid #4c5fe2'
})

function BookInfo({ feed }){
    const space = 1;
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const navg = useNavigate();

    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}>
                <Stack direction="row" sx={{ alignItems: "center", p :"24px 0 0 0", display: { xs: "none", sm: 'block' }, fontFamily: "Nunito Sans,SF Pro Text,SF Pro Icons,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;" }}>
                    <Home sx={{ fontSize: '16px' }} onClick={() => navg('/')} />/
                    <Link href='/book'>{feed.genre[0]}</Link>/
                    {feed.title}
                </Stack>
            </Grid>
            <Grid item xs={3} spacing={space * 4} sx={{ pt: 4 }}>
                <Box
                    component="img"
                    sx={{
                        height: 408,
                        width: 300,
                        // pl: '8%'
                    }}
                    src={feed.img}
                />
            </Grid>
            <Grid item xs={7} sx={{ pt: 4 }}>
                <Typography variant="h4" sx={{ pr: "15%" }}>
                    {feed.title}
                </Typography> <br />
                <Typography sx={{ color: "#83848f", pl: 1 }}>
                    Author: <Link href="/author" Underline="none">{feed.author_name}</Link>
                </Typography>
                <Grid container direction="row" spacing={space} sx={{ alignItems: "center", pt: 2 }}>
                    <Grid item> <Rating value={rating} precision={0.01} size="large" readOnly />  </Grid>
                    <Grid item> <Typography sx={{ fontSize: '24px' }}> {rating} </Typography> </Grid>
                    <Grid item> <Typography> ({feed.ratingCount} ratings) </Typography> </Grid>
                </Grid>
                <Stack direction="row" sx={{ pt: '20%' }} spacing={2}>
                    <Button type="submit" variant="contained" size="large" sx={{ borderRadius: "24px" }}>Read</Button>
                    <Button type="submit" variant="contained" size="large" startIcon={<Add />} sx={{ borderRadius: "24px" }}> Add to Library</Button>
                </Stack>
                <Stack direction="row" sx={{ alignItems: "center", pt: '4%' }} spacing={0.5}>
                    <Flag size="small" color="#83848f" sx={{ fontSize: '16px' }} />
                    <Link underline="none" color="#83848f" sx={{ fontSize: '14px' }}>Report Story</Link>
                </Stack>
            </Grid>
        </Grid>
    );
}

function Genre({ genreList }){
    return (
        genreList.map((genre) => (
            <Link href={`/genre/${genre}`} underline="hover"
                sx={{ 
                    backgroundColor: 'rgb(235 21 81 / 12%)', 
                    color: "#eb1551", 
                    fontSize: "20px", 
                    p: '1px 8px', 
                    m: '0 8px 8px 8px', 
                    borderRadius: '12px',
                }}># {genre} <FavoriteBorder sx={{ fontSize: "13px" }}/></Link>
        ))
    )
}

function About({ display='block', summary, genre, rec }){
    return(
        <Stack direction="row" sx={{ display }}>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Synopsis</Typography>
            <Typography variant="body1">{summary}</Typography>
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>Tags</Typography>
            <Genre genreList={genre}/>
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>You May Also Like</Typography>
            <Typography>{rec}</Typography>
        </Stack>
    )
}

function TableContent({ display='none', chapters }){
    return(
        <Paper sx={{ display }}>Chapter List</Paper>
    )
}

function HomeFeed({ feed }) {
    const [isFocused, setIsFocused] = useState(false);
    return(
        <>
            <BookInfo feed={feed} />
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={10}>
                    <Stack direction='row' spacing={3}
                        sx={{
                            alignItems: "center",
                            fontWeight: '400',
                            marginTop: '48px',
                            marginBottom: '48px'
                        }}>
                        <Typography variant="h4" color={isFocused ? "#b7b7b7" : 'black'} onClick={() => setIsFocused(false)}>About</Typography>
                        <DividerVertical backgroundColor="#b7b7b7" />
                        <Typography variant="h4" color={isFocused ? 'black' : "#b7b7b7"} onClick={() => setIsFocused(true)} >Table of Contents</Typography>
                    </Stack>
                    <Underline sx={{ width: '' }} />
                    <About display={isFocused ? 'none' : 'block'} summary={feed.summary} genre={feed.genre} rec={feed.rec} />
                    <TableContent display={isFocused ? 'block' : 'none'} />

                </Grid>
            </Grid>
        </>
    )
}

export default function BookID() {
    const location = useLocation();
    // const [Book, setBook] = useState({});

    // const fetchData = async () => {
    //     let bookId = location.pathname.split('/')[2]
    //     const resp = await axios.get(`/book/api/${bookId}`)
    //     setBook(resp.data.data[0]);
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [])

    const Book = {
        "_id": "62ee828adabfe76df8e50628",
        "title": "harry potter and the sorcerer's stone",
        "author_name": "fallen",
        "summary": "Summary need to be updated plz check after sometime",
        "isbn": "9780001912366",
        "genre": ['fantasy', 'classics'],
        "img": "/bookCover/d58d85af9c3d7e995cd9155fc9f6a162",
        "review_id": [],
        "pub_date": "2022-08-06T15:02:33.862Z",
        "totalRating": 350,
        "ratingCount": 120,
        "hotRank": 0,
        "popRank": 0,
        "__v": 0
    }

    if (!Object.keys(Book).length) return <Loading />

    return (
        <HomeFeed feed={Book} />
    )
}

