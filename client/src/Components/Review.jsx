import { 
    Avatar, Divider, Card, CardHeader, CardContent,
    Grid, Typography, Stack, Rating, Button 
} from '@mui/material'
import { AddCommentRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import ReviewAdd from './ReviewAdd'
import { useFetch } from '../customHooks/DataHandler'

function ReviewBlock({ review }){
    const { user, rating, comment } = review;
    return (
        <Card sx={{ width: "78vw", mb: 1 }} variant="outlined">
            <CardHeader 
                sx={{ pb: 1 }}
                avatar={
                    <Avatar fontSize="small">
                            { user[0].toUpperCase() }
                        </Avatar>
                }
                title={
                    <Typography variant="body2">{user}</Typography>
                }
                subheader={
                    <Rating sx={{ fontSize: "20px" }} value={rating} precision={0.01} readOnly />
                }
            />
            <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2">{ comment }</Typography>
            </CardContent>
        </Card>
    )
}

function ReviewList({ reviews }){
    return (
        <Grid container sx={{ justifyContent: "center" }}>{
            reviews.map((review, i) => {
                return <ReviewBlock review={review} key={i} />
            })
        }</Grid>
    )
}

function Comp({ feed }){
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const [open, setOpen] = useState(false);

    return (
        <Grid container sx={{ mt: 4, mb: "2%" }}>
            <Divider />
            <Grid item xs={14} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Typography variant="h6">
                        {`${feed.ratingCount} Reviews`}
                    </Typography>

                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", m: 0 }}>
                        <Rating sx={{ fontSize: { xs: "20px", sm: "25px" } }} value={rating} precision={0.01} readOnly />
                        <Typography variant="h6" sx={{ pr: '5px' }}> {rating} </Typography>
                    </Stack>
                </Stack>

                <Button 
                    startIcon={<AddCommentRounded />}
                    variant="contained"
                    sx={{ borderRadius: "24px", fontSize: "16px", display: { xs: "none", sm: "flex" } }}
                    onClick={() => setOpen(true)}
                >
                    Write a Review
                </Button>

            </Grid>

            <Divider />
            <Grid item>
                <ReviewList reviews={feed.review_id}/>
            </Grid>

            <ReviewAdd _id={feed._id} open={open} setOpen={setOpen}/>
        </Grid>
    )
}

export default function Review(){
    const bookId = useLocation().pathname.split('/')[2];
    const feed = useFetch(`/review/api/${bookId}`)?.data;

    return <>{
        feed ? <Comp feed={feed} /> : <></>
    }</>
}