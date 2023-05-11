import { ImageList, ImageListItem, ImageListItemBar, 
    Grid, Typography, Divider, Button, IconButton 
} from '@mui/material'
import { Sort, Delete } from '@mui/icons-material';
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { PageLayout, Context} from '../Components/PageLayout';

function BookList({ sortType }){
    const navg = useNavigate()
    const lib = useContext(Context);

    const compareFnc = (a, b) => {
        let compareVal = 'added'
        if (sortType) compareVal = 'read'
        
        return a[compareVal] < b[compareVal] ? 1 : -1
    };

    const [Feed, setFeed] = useState(lib);

    useEffect(() => {
        setFeed((prev) => [...prev].sort(compareFnc))
    }, [sortType])

    return (
        <ImageList
            sx={{ height: 'inherit', pt: '10px' }}
            cols={6}
            spacing={10}
        >
            {Feed.map((book) => (
                <ImageListItem key={book._id}>
                    <img
                        onClick={() => navg(`/book/${book._id}`)}
                        src={book.img}
                        style={{ resize: "auto", objectFit: "scale-down" }}
                        alt='Not Found'
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={
                            <Typography
                                onClick={() => navg(`/book/${book._id}`)}
                                variant="subtitle2"
                                sx={{ cursor: "pointer", display: { sm: "block", xs: "none" } }}
                            >{book.title}</Typography>
                        }
                        actionIcon={
                            <IconButton
                                id={book._id}
                                sx={{ color: '#ed424b' }}
                                aria-label="Remove From Library"
                                onClick={(event) => {
                                    const id = event.currentTarget.id
                                    axios.post(`/library/removeItem`, { id })
                                        .then((resp) => {
                                            if(resp.status === 200)
                                                setFeed((prevFeed) => [...prevFeed].filter(book => book._id !== id))
                                        })
                                }}
                            >
                                <Delete fontSize="small"/>
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

function Title({ data, setData }){
    return (
        <>  
            <Divider />
            <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Typography variant="h4" sx={{ pt: "40px", pl: "8.5%", fontSize: '40px' }}>Library</Typography>
                </Grid>
                <Grid item xs={10} sx={{ display: "flex", justifyContent: "flex-end", pb: "10px" }}>
                    <Button
                        variant="outlined"
                        startIcon={ <Sort /> }
                        onClick={ () => setData((prev) => !prev) }
                    >
                        { data ? "Recently Read" : "Last Added" }
                    </Button>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default function Library() {  
    const [sortType, setSortType] = useState(1);

    return (
        <PageLayout 
            url="/library/api" 
            elem={<Title data={sortType} setData={setSortType} />} 
            gridElem={<BookList sortType={sortType} />}
            failureMsg= "Your Library is Empty"
        />
    )
}
