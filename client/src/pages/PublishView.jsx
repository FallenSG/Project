import { Paper, Grid, Stack, 
        Typography, Box, Tabs, 
        Tab, Chip
    } from '@mui/material'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Context, PageLayout } from '../Components/PageLayout'
import Path from '../Components/PubPath'
import ChapList from '../Components/ChapList'

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
                    <Box sx={{ p: "12px 24px", overflow: "hidden" }}>
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
                <ChapList feed={feed.draft} type="author" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ChapList feed={feed.publish} type="author" />
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
        <Paper sx={{ mt: "1%", backgroundColor: "#f6f7fc" }}>
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            flexWrap="nowrap"
            alignItems="stretch"
            sx={{ p: "0 0 0 1.5%", fontVariantCaps: "petite-caps", textTransform: "lowercase" }}
            spacing={2}
        >
            <Grid item xs={12}> <Path /> </Grid>
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
        </Paper>
    )
}

export default function PublishView(){
    const bookId = useLocation().pathname.split('/')[3];

    return (
        <PageLayout
            nav="publish" 
            url={`/publish/api/${bookId}`}
            gridElem={<Comp />}
            gridXs={11}
            failureMsg="No Such Book Exists"
        />
    )
}