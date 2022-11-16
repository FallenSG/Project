import {
    Paper, Box, Grid,
    Stack, Typography,
    Rating, Link, Button, Tabs, Tab
} from '@mui/material'
import { Flag, Home, Add, FavoriteBorder} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'

import PageLayout from '../Components/PageLayout';
import Loading from '../Components/PageLayout';

const Context = createContext({});

function BookInfo() {
    const feed = useContext(Context);

    const space = 1;
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const navg = useNavigate();

    return ( 
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}>
                <Stack direction="row" sx={{ alignItems: "center", p: "24px 0 0 0", display: { xs: "none", sm: 'block' }, fontFamily: "Nunito Sans,SF Pro Text,SF Pro Icons,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;" }}>
                    <Home sx={{ fontSize: '16px' }} onClick={() => navg('/')} />/
                    <Link href='/book'>{feed.genre[0]}</Link>/
                    {feed.title}
                </Stack>
            </Grid>
            <Grid item xs={3} sx={{ pt: 2 }}>
                <Box
                    component="img"
                    sx={{
                        height: 408,
                        width: 300,
                    }}
                    src={feed.img}
                />
            </Grid>
            <Grid item xs={7} sx={{ pt: 4 }}>
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
                    }}># {elem} <FavoriteBorder sx={{ fontSize: "13px" }} /></Link>
            ))
        }</Stack>

    )
}

function About() {
    const { summary, rec } = useContext(Context);
    return (
        <Stack>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Synopsis</Typography>
            <Typography variant="body1">{summary}</Typography>
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>Tags</Typography>
            <Genre />
            <Typography variant="h5" sx={{ margin: "48px 0 16px" }}>You May Also Like</Typography>
            <Typography>{rec}</Typography>
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
    const location = useLocation();
    const [Book, setBook] = useState({});

    const fetchData = async () => {
        let bookId = location.pathname.split('/')[2]
        const resp = await axios.get(`/book/api/${bookId}`)
        setBook(resp.data.data);
    }
    useEffect(() => {
        fetchData();
    }, [])

    // const Book = {
    //     "_id": "62ee828adabfe76df8e50628",
    //     "title": "harry potter and the sorcerer's stone",
    //     "author_name": "fallen",
    //     "summary": "Summary need to be updated plz check after sometime",
    //     "isbn": "9780001912366",
    //     "genre": ['fantasy', 'classics'],
    //     "img": "/bookCover/d58d85af9c3d7e995cd9155fc9f6a162",
    //     "review_id": [],
    //     "pub_date": "2022-08-06T15:02:33.862Z",
    //     "totalRating": 350,
    //     "ratingCount": 120,
    //     "hotRank": 0,
    //     "popRank": 0,
    //     "__v": 0
    // }

    var element=<></>, gridElem;
    if (!Object.keys(Book).length) gridElem = <Loading />;
    else {
        element = <BookInfo />
        gridElem = <TabSection />
    }

    return (
        <Context.Provider value={Book}>
            <PageLayout nav='normal' element={element} gridElem={gridElem} />
        </Context.Provider>
    )
}
