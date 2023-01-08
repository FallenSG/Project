import axios from 'axios'
import Loading from '../Components/Loading'
import { useNavigate } from "react-router-dom";
import { Star, AddCircleOutlined } from '@mui/icons-material'
import { Grid, Link, Typography, Button, Stack } from '@mui/material'  
import { useState, useEffect, useRef, useCallback } from 'react';


export function BookTab({ info, inRef }) {
    let rating = (info.totalRating / info.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;

    const navg = useNavigate();

    const handleAdd = () => {
        axios.post('/library/addItem', { bookId: info._id })
            .then(data => console.log(data, info._id, info.title))
            .catch(err => console.log(err, info._id, info.title));
    }


    return (
        <Grid item container ref={inRef} key={info._id} xs={6}
            sx={{
                height: "30vh",
            }}
        >
            <Grid item xs={4}>
                <img
                    onClick={() => navg(`/book/${info._id}`)}
                    src={info.img}
                    style={{ aspectRatio: "0.8", resize: "auto", objectFit: "scale-down", height: "30vh", cursor: "pointer" }}
                    alt='Not Found'
                    loading="lazy"
                />
            </Grid>
            <Grid item xs={8}>
                <Stack sx={{ justifyContent: "none" }}>
                    <Link
                        href={`/book/${info._id}`}
                        underline="hover"
                        sx={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        {info.title}
                    </Link> <br />

                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: "darkslategrey" }}
                    >
                        {info.summary}
                    </Typography> <br />

                    <Stack direction="row" spacing={3}>
                        <Button
                            sx={{ width: "fit-content" }}
                            startIcon={<Star />}
                            disabled
                        >
                            {rating}
                        </Button>

                        <Button
                            startIcon={<AddCircleOutlined />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}

export function Booklist({ url }){
    const [page, setPage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        setLoading(true);

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
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading]);

    return (
        <Grid container spacing={5}>
            {content.map((book, i) => {
                if (content.length - 5 === i) {
                    return <BookTab inRef={lastBookElementRef} info={book} />
                } else {
                    return <BookTab info={book} />
                }
            })}
            {loading && <Loading />}
        </Grid>
    )
}
