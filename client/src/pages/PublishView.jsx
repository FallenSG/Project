import { Paper, Grid, Stack, 
        Typography, Box, Tabs, 
        Tab, Button, Divider, Link, Chip
    } from '@mui/material'
import { ReceiptLongOutlined } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Context, PageLayoutPublish } from '../Components/PageLayout'


function TabOut({ feed }){
    if(!feed.length){
        return (
            <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                spacing={3}
                sx={{ color: "rgb(18 18 23 / 60%)" }}
            >
                <ReceiptLongOutlined sx={{ height: "125px", width: "125px" }} />
                <Typography>No Chapters Found</Typography>
                
                <Button variant="contained">Create Now</Button>
                <Button variant="outlined">One Click Import</Button>
            </Stack>
        )
    }

    return (
        <Stack direction="column">
            { feed.map((book, i) => {
                console.log(i, book);
                const chapter = book.path.split('_')[1];
                const DateOup = new Date(book.date)
                
                const date = DateOup.toDateString().split(" ").splice(1).join(" ")
                const time = DateOup.toTimeString().split(" ")[0].split(":")

                return (
                    <>
                        <div 
                            id={book.path} 
                            style={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                margin: "7px" 
                            }}
                        >
                            <Link 
                                underline="hover" 
                                href={chapter} 
                                sx={{ 
                                    color: "rgb(26 26 30 / 78%)",
                                    fontSize:"21px",
                                    lineHeight: "22px",
                                    fontWeight: "550",
                                    textTransform: "capitalize",
                                    fontVariantCaps: "petite-caps",
                                    ml: "5px"
                                }}
                            >
                                {chapter}
                            </Link>

                            <Typography
                                sx={{ 
                                    color: "rgb(18 18 23 / 60%)", 
                                    letterSpacing: "0.5px",
                                    textTransform: "lowercase",
                                    fontSize: {xs: "14px", md: "17px"},
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    fontVariantCaps: "small-caps",
                                    mr: "10px"
                                }}
                            >{`${time[0]}:${time[1]} ${date}`}
                            </Typography>
                        </div>
                        <Divider />
                    </>
                )
            }) }
        </Stack>
    )
}

function TabSection() {
    const feed = useContext(Context).book_id;

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
                    <Box sx={{ p: 3, overflow: "hidden" }}>
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
        fontSize: { xs: "14px", sm: "18px" }
    }

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Draft" sx={{ ...dispStyle }} {...allyProps(0)} />
                    <Tab label="Published" sx={{ ...dispStyle }} {...allyProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabOut feed={feed.draft}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabOut feed={feed.chapter}/>
            </TabPanel>
        </Box>
    )

}

function Comp(){
    const feed = useContext(Context);
    const styling = {
        fontWeight: "450",
        fontSize: "19px"
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            flexWrap="nowrap"
            alignItems="stretch"
            sx={{ p: "0 0 0 1.5%",  fontVariantCaps: "petite-caps", textTransform: "lowercase"}}
            spacing={2}
        >
            <Grid item xs={12} sx={{ display: "flex" }}>
                <img
                    style={{
                        width: "20vw",
                        aspectRatio: "0.8",
                        resize: "auto",
                        objectFit: "scale-down"
                    }}
                    src={feed.book_id.img}
                />

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={{ xs: 2, md: 3 }}
                    sx={{ pl: {xs: "2%", md: "1%"}, fontVariantCaps: "petite-caps", textTransform: "math-auto" }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "500" }}>{feed.book_id.title}</Typography>
                    <Typography variant="subtitle" sx={{ ...styling }}>By  {feed.username}</Typography>
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...styling }}>Genre Tag</Typography>
                        { feed.book_id.genre.map((elem) => (
                            <Chip
                                sx={{ backgroundColor: "rgb(235 21 81 / 12%)", color: "#eb1551", fontSize: "18px", fontVariantCaps: "small-caps", margin: "5px" }}
                                label={`#${elem}`}
                                size="small"
                            />
                        )) 
                    }</Stack>
                </Stack>
            </Grid>
            <Grid item> <TabSection /> </Grid>
            
        </Grid>
    )
}

export default function PublishView(){
    const bookId = useLocation().pathname.split('/')[3];

    return (
        <PageLayoutPublish 
            url={`/publish/api/${bookId}`}
            gridElem={<Comp />}
            failureMsg="No Such Book Exists"
        />
    )
}