import {
    Box, Chip,
    Link, Tabs, Tab,
    Stack, Typography, IconButton,
    ImageList, ImageListItem, ImageListItemBar
} from '@mui/material'
import { ArrowDropDown, FavoriteBorder, ArrowDropUp } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import { PageLayout, Context} from '../Components/PageLayout';
import BookInfo from '../Components/BookIDComp'


function Genre() {
    const { genre } = useContext(Context);
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>{ 
            genre.map((elem) => (
                <Chip 
                    sx={{ backgroundColor: "rgb(235 21 81 / 12%)", color: "#eb1551", fontSize: "20px", fontVariantCaps: "small-caps", margin: "5px" }}
                    label={`#${elem}`} 
                    component="a" 
                    href={`/genre/${elem}`} 
                    clickable 
                    size="medium"
                />
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
    const [readMore, setReadMore] = useState(false);
    
    const text = summary.split(" ");
    const length = text.length

    return (
        <Stack>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Synopsis</Typography>
            
            <Typography 
                variant="body1" 
                sx={{
                    m: "10px 10px 0 10px",
                    letterSpacing: "0.5px",
                    color: "rgb(18 18 23 / 90%)"
                }}
            >
                {!readMore ? text.splice(0,40).join(" ") : summary}
            </Typography>

            <div style={{ display: "flex", direction: "column", justifyContent: "space-between" }}>
                <span />
                
                { length > 20 ? 
                    ( <IconButton 
                        sx={{ right: "0", width: "fit-content", p: 0 }}
                        onClick={ () => setReadMore(!readMore) }
                    >
                        { !readMore ? <ArrowDropDown /> : <ArrowDropUp /> }
                    </IconButton>) : <span />
                    }
            </div>
            

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

    const dispStyle = {
        fontSize: { xs: "20px", sm: "26px" }
    }

    return (
        <Box sx={{ width: "100%", marginTop: "48px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                >
                    <Tab label="About" sx={{ ...dispStyle }} {...allyProps(0)} />
                    <Tab label="Table Of Content" sx={{ ...dispStyle }} {...allyProps(1)} />
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
            url={`/book/api/${bookId}?recd=1`}
            elem={<BookInfo />} 
            gridElem={<TabSection />} 
            failureMsg="No Such Book Exists"
        />
    )
}
