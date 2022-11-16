import { ImageList, ImageListItem, ImageListItemBar, Typography, Link, Grid, Divider } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Loading from '../Components/Loading'
import PageLayout from '../Components/PageLayout'

function Feed({ bookCatg, catgTitle, routeName = "" }) {
    const navg = useNavigate();
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h6">{catgTitle}</Typography>
                </Grid>

                <Grid item>
                    <Link
                        href={`/book/${routeName}`}
                        variant="body1"
                        underline="none"
                        component="button"
                    >
                        More..
                    </Link>
                </Grid>
            </Grid>

            <Divider />

            <ImageList
                sx={{ height: 'inherit', pt: '10px' }}
                cols={8}
                spacing={1}
            >
                {bookCatg.map((book) => (
                    <ImageListItem key={book._id}>
                        <img
                            onClick={() => navg(`/book/${book._id}`)}
                            src={book.img}
                            alt='Not Found'
                            loading="lazy"
                        />
                        <ImageListItemBar
                            onClick={() => navg(`/book/${book._id}`)}
                            sx={{ width: '10vw' }}
                            title={book.title}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default function Home(){
    const [bookData, setBookData] = useState({});

    const fetchData = async () => {
        const resp = await axios.get('/book');
        setBookData(resp.data.data[0]);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    var element;
    if (!Object.keys(bookData).length) element = <Loading />;
    else element = <>
        <Feed catgTitle={'New Arrival'}
            bookCatg={bookData['newArrival']} routeName={'newest'} />
        <Feed catgTitle={'Popular Books'}
            bookCatg={bookData['popRating']} routeName={'popular'} />
        <Feed catgTitle={'Hot Rated'}
            bookCatg={bookData['hotRating']} routeName={'hot'} />
        <Feed catgTitle={'Rank'}
            bookCatg={bookData['ranking']} routeName={'ranking'} />
    </>;
    
    return (
        <PageLayout nav="normal" gridElem={element} />
    )
}   
