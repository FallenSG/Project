import { Paper, Box, Grid, Stack, Typography, Rating, Link, Button } from '@mui/material'
import { Flag } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from '../Components/Loading'

function HomeFeed({ feed }) {
    const space = 1;
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;
    return (
        <>
            <Paper sx={{ backgroundColor: "#f5f6fc", pt: 2, pb: 2 }}>
                <Stack direction="row" spacing={space * 4}>
                    <Box
                        component="img"
                        sx={{
                            height: 450,
                            width: 350,
                            pl: '10%'
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 350, md: 250 },
                            // pt: '30px',
                            // pl: '30px'
                        }}
                        src={feed.img}
                    />

                    <Stack>
                        <Typography variant="h4">
                            {feed.title}
                        </Typography> <br />
                        <Typography>
                            Author: {feed.author_name}
                        </Typography>
                        <Grid container direction="row" spacing={space}>
                            <Grid item> <Rating value={rating} precision={0.01} readOnly />  </Grid>
                            <Grid item> <Typography> {rating} </Typography> </Grid>
                            <Grid item> <Typography> ({feed.ratingCount}) </Typography> </Grid>
                        </Grid>
                        <Stack direction="row" sx={{ pt: 10 }} spacing={3}>
                            <Button type="submit" variant="outlined">Read</Button>
                            <Button type="submit" variant="outlined">Add to Library</Button>
                        </Stack>
                        <Stack direction="row">
                            <Flag />
                            <Link>Report Story</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
            <Typography variant="h3">About</Typography>
        </>
    )
}

export default function BookIDComp() {
    const location = useLocation();
    // const [Book, setBook] = useState({});
    // let Elem;    

    // useEffect(() => {
    //     async function fetchData() {
    //         let bookId = location.pathname.split('/')[2]
    //         const resp = await axios.get(`/book/api/${bookId}`)
    //         setBook(resp.data.data[0]);
    //     }
    //     fetchData();
    // })
    const Book = {
        "_id": "62ee828adabfe76df8e50628",
        "title": "harry potter and the sorcerer's stone",
        "author_name": "fallen",
        "summary": "Summary need to be updated plz check after sometime",
        "isbn": "9780001912366",
        "genre": [],
        "img": "/bookCover/bf37d4938eb95ae8ac5452c1eb48d304",
        "review_id": [],
        "pub_date": "2022-08-06T15:02:33.862Z",
        "totalRating": 0,
        "ratingCount": 10,
        "hotRank": 0,
        "popRank": 0,
        "__v": 0
    }

    if (!Object.keys(Book).length) return <Loading />

    return (
        <HomeFeed feed={Book} />
    )
}

