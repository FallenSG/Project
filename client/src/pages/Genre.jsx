import { Stack,Grid, Paper, ImageList, ImageListItemBar, ImageListItem, Button, Typography } from '@mui/material'
import { useState, useEffect, useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

import { PageLayoutOverload } from '../Components/PageLayout'
import Loading from '../Components/Loading'
import { useCallback } from 'react';



function HighLight({ genre }){
    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}>
                <Typography> {genre} </Typography>
            </Grid>
        </Grid>
    )
}

function BookTab({ info, inRef }){
    return (
        <Grid container>
            <Grid item xs={3}>
                <img
                    ref={inRef}
                    // onClick={() => navg(`/book/${info._id}`)}
                    src={info.img}
                    style={{ aspectRatio: "0.8", resize: "auto", objectFit: "scale-down", height: "40vh" }}
                    alt='Not Found'
                    loading="lazy"
                />
            </Grid>
            <Grid item xs={9}>
                <Stack>
                    <Typography>{info.title}</Typography>
                    <Typography>Description</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

function BookList({ url }){
    // const books = useContext(Context);
    const [ page, setPage ] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(false);

        axios.get(url,
            { params: { page } }
        )
            .then(resp => {
                setContent(prevContent => [...prevContent, ...resp.data[0].books])
                setLoading(false);
                setHasMore(resp.data[0].remainingDoc[0].count > 15);
            })
            .catch(err => console.log(err));
    }, [page])

    const observer = useRef();
    const lastBookElementRef = useCallback((node) => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading]);

        return (
            <div>
                {content.map((book, i) => {
                    if(content.length-5 === i ){
                        return <BookTab inRef={lastBookElementRef} info={book} />
                    } else {
                        return <BookTab info={book} />
                    }
                })}
                {loading && <Loading />}
            </div>
        )
}

export default function Genre(){
    const genre = useLocation().pathname.split('/')[2];
    const url = `/genre/api/${genre}`;    

    return (
       <PageLayoutOverload
            elem={<HighLight genre={genre} />}
            gridElem={<BookList url={url} />}
       />
    )

}