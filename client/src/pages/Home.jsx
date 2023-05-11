import { ImageList, ImageListItem, ImageListItemBar, 
    Typography, Link, Grid, Divider } from '@mui/material'
import {  useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageLayout, Context } from '../Components/PageLayout'

function Feed({ catg, catgTitle, routeName = "" }) {
    const navg = useNavigate();
    const bookCatg = useContext(Context)[0][catg];

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
                        href={`/ranking/${routeName}`}
                        variant="body1"
                        underline="hover"
                    >
                        More..
                    </Link>
                </Grid>
            </Grid>

            <Divider />

            <ImageList
                sx={{ pt: '10px' }}
                cols={5}
                spacing={1}
            >
                {bookCatg.map((book) => (
                    <ImageListItem key={book._id}>
                        <img
                            onClick={() => navg(`/book/${book._id}`)}
                            src={book.img}
                            style={{ resize: "auto", objectFit: "scale-down" }}
                            alt='Not Found'
                            loading="lazy"
                        />
                        <ImageListItemBar
                            onClick={() => navg(`/book/${book._id}`)}
                            title={
                                <Typography
                                    variant="subtitle2"
                                    sx={{ 
                                        cursor: "pointer" 
                                    }}
                                >{book.title}</Typography>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default function Home(){
    var element = <>
        <Feed catgTitle={'New Arrival'}
            catg={'newArrival'} routeName={'newest'} />
        <Feed catgTitle={'Popular Books'}
            catg={'popRating'} routeName={'popular'} />
        <Feed catgTitle={'Hot Rated'}
            catg={'hotRating'} routeName={'hot'} />
        <Feed catgTitle={'Rank'}
            catg={'all'} routeName={'all'} />
    </>;
    
    return (
        <PageLayout 
            url="/book"
            gridElem={element} 
            failureMsg="Error"
        />
    )
}   
