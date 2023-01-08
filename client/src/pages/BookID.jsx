import {
    Box, Grid,
    Stack, Typography,
    Rating, Link, Button, Tabs, Tab,
    ImageList, ImageListItem, ImageListItemBar
} from '@mui/material'
import { Flag, Home, Add, FavoriteBorder} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'

import { PageLayout, Context} from '../Components/PageLayout';

function BookInfo() {
    const feed = useContext(Context);

    const handleAdd = () => {
        axios.post('/library/addItem', { bookId: feed._id })
            .then(data => console.log(data, feed._id, feed.title))
            .catch(err => console.log(err, feed._id, feed.title));
    }

    const space = 1;
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;   

    const navg = useNavigate();

    return ( 
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}> {/* path  */}
                <Stack direction="row" sx={{ alignItems: "center", p: "24px 0 0 0", display: { xs: "none", sm: 'block' }, fontFamily: "Nunito Sans,SF Pro Text,SF Pro Icons,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;" }}>
                    <Home sx={{ fontSize: '16px' }} onClick={() => navg('/')} />/
                    <Link href={`/genre/${feed.genre[0]}`} underline='hover'>{feed.genre[0]}</Link>/
                    {feed.title}
                </Stack>
            </Grid>

            <Grid item xs={3} sx={{ pt: 2 }}> {/* Book Cover */}
                <Box
                    component="img"
                    sx={{ height: "30vw",
                        aspectRatio: "0.8", resize: "auto", objectFit: "scale-down"
                    }}
                    src="/bookCover/d73121ac45881355f5a7969f98bf89f9"//{feed.img}
                />
            </Grid>
            
            <Grid item xs={7} container sx={{ pt: 4 }}>
                <Grid item xs={12} sx={{ height: "15vw" }}>
                    <Typography variant="h4" sx={{ pr: "15%" }}>
                        {feed.title}
                    </Typography> <br />
                    <Typography sx={{ color: "#83848f", pl: 1 }}>
                        Author: <Link href={`/author/${feed.author_id._id}`} underline="hover">{feed.author_id.username}</Link>
                    </Typography>
                    <Grid container direction="row" spacing={space} sx={{ alignItems: "center", pt: 2 }}>
                        <Grid item> <Rating value={rating} precision={0.01} size="large" readOnly />  </Grid>
                        <Grid item> <Typography sx={{ fontSize: '24px' }}> {rating} </Typography> </Grid>
                        <Grid item> <Typography> ({feed.ratingCount} ratings) </Typography> </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12} sx={{ height: "15vw" }}>
                    <Stack direction="row" sx={{ pt: '12%' }} spacing={2}>
                        <Button type="submit" variant="contained" size="large" sx={{ borderRadius: "24px" }}>Read</Button>
                        <Button 
                            sx={{ borderRadius: "24px" }}
                            onClick={handleAdd}
                            type="submit" 
                            variant="contained" 
                            size="large" 
                            startIcon={<Add />} 
                        > Add to Library</Button>
                    </Stack>

                    <Button
                        sx={{ fontSize: "14px", mt: "3%", color: "#83848f"}} 
                        onClick={() => {}}
                        startIcon={<Flag />}
                    >
                        Report Story
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

function Genre() {
    const { genre } = useContext(Context);
    return (
        <Stack direction="row">{ 
            genre.map((elem) => (
                <Link key={elem} href={`/genre/${elem}`} underline="hover"
                    sx={{
                        backgroundColor: 'rgb(235 21 81 / 12%)',
                        color: "#eb1551",
                        fontSize: "20px",
                        p: '1px 8px',
                        m: '0 8px 8px 8px',
                        borderRadius: '12px',
                        width: "fit-content"
                    }}># {elem} <FavoriteBorder sx={{ fontSize: "13px" }} />
                </Link>
            ))
        }</Stack>

    )
}

function Recd(){
    const { recd } = useContext(Context);
    const navg = useNavigate();
    return (
        <>
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>You May Also Like</Typography>
            <ImageList
                sx={{ height: 'inherit', pt: '10px' }}
                cols={6}
                spacing={1}
            >
                {recd.map((book) => (
                    <ImageListItem key={book._id}>
                        <img
                            onClick={() => navg(`/book/${book._id}`)}
                            src={book.img}
                            style={{ aspectRatio: "0.8", resize: "auto", objectFit: "scale-down" }}
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

function About() {
    const { summary } = useContext(Context);
    return (
        <Stack>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Synopsis</Typography>
            <Typography variant="body1">{summary}</Typography>
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>Tags</Typography>
            <Genre />
            <Recd />
        </Stack>
    )
}

function TableContent() {
    // const { chapters } = useContext(Context);
    return (
        <p>Chapter List</p>
    )
}

function TabSection() {
    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ pt: 3, overflow: "hidden" }}>
                       {children}
                    </Box>
                )}
            </div>
        );
    }

    const allyProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", marginTop: "48px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                >
                    <Tab label="About" sx={{ fontSize: "26px" }} {...allyProps(0)} />
                    <Tab label="Table Of Content" sx={{ fontSize: "26px" }} {...allyProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <About />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableContent />
            </TabPanel>
        </Box>
    )

}

export default function BookID(){
    const bookId = useLocation().pathname.split('/')[2];
   
    return (
       <PageLayout
            url={`/book/api/${bookId}`}
            elem={<BookInfo />} 
            gridElem={<TabSection />} 
            failureMsg="No Such Book Exists"
        />
    )
}
