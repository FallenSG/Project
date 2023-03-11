import { useState, useEffect, useContext } from 'react'
import { Paper, Grid, Typography, Button, Box, Stack, Divider } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageLayout, Context } from '../Components/PageLayout'

function Info({ feed }){
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    return (
        <Grid 
            container
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
        >
            <Grid item xs={2}><Typography variant="h6">{feed.title}</Typography></Grid>
            <Grid item xs={1}><Typography>{feed.chapCount}</Typography></Grid>
            <Grid item xs={1}><Typography>{rating}</Typography></Grid>
            <Grid item xs={1}><Typography>{feed.ratingCount}</Typography></Grid>
            <Grid item xs={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>            
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    href={`/publish/view/${feed._id}`}
                >Explore</Button>
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    >...</Button>
            </Grid>
        </Grid>
    )
}

function BookTab({ feed }){

    return (
        <Box sx={{ flewGrow: 1, backgroundColor: "#f5f6fc" }}>
            <Grid 
                item container
                direction="row"
                key={feed._id}
                // justifyContent="flex-start"
                alignItems="center"
            >   
                <Grid item xs={2}>
                    <img
                        style={{
                            height: "30vh",
                            aspectRatio: "0.8",
                            resize: "auto",
                            objectFit: "scale-down"
                        }}
                        src={feed.img}
                    />
                </Grid>
                <Grid item xs={10}> <Info feed={feed} /> </Grid>
            </Grid>
        </Box>
    )
}

function Comp(){
    const bookList = useContext(Context).book_id;
    
    return (
        <Paper sx={{ backgroundColor: "#f6f7fc" }}>
            <>
                <Grid 
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: "1% 0", color: "rgb(18 18 23 / 60%)" }}
                >
                    <Grid item xs={4} sx={{ display:"flex", justifyContent: "center" }}><Typography>Name</Typography></Grid>
                    <Divider orientation='vertical' flexItem  />
                    <Grid item xs={1}><Typography>Chapter</Typography></Grid>
                    <Divider orientation='vertical' flexItem  />
                    <Grid item xs={1}><Typography>Rating</Typography></Grid>
                    <Divider orientation='vertical' flexItem  />
                    <Grid item xs={1}><Typography>Rating Count</Typography></Grid>
                    <Divider orientation='vertical' flexItem  />
                    <Grid item xs={2} sx={{ display:"flex", justifyContent: "center" }}><Typography>Operations</Typography></Grid>
                </Grid>
                <Divider />
                {bookList.map((book) => {
                    return (<>
                        <BookTab feed={book}/>
                        <Divider />
                    </>)
                        
                })}
            </>
        </Paper>
    )

}

export default function PublishList(){
    const path = useLocation().pathname.split('/')[1];

    return (
        <PageLayout
            nav="publish"
            url={`/${path}/api`}
            gridElem={ <Comp /> }
            columns={12}
            gridXs={11}
        />
    )
}