import { ImageList, ImageListItem, ImageListItemBar, Grid, Typography, Divider, Link } from '@mui/material'
import { Brush } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import PageLayout from '../Components/PageLayout';
import Loading from '../Components/Loading';

function BookList({ lib }){
    const navg = useNavigate()

    return (
        <ImageList
            sx={{ height: 'inherit', pt: '10px' }}
            cols={6}
            spacing={1}
        >
            {lib.map((book) => (
                <ImageListItem key={book._id} sx={{ height: "230px", width: "170px" }}>
                    <img
                        onClick={() => navg(`/book/${book._id}`)}
                        src="/bookCover/d58d85af9c3d7e995cd9155fc9f6a162"
                        sx={{ overflow: 'hidden', borderRadius: '5px' }}
                        alt='Not Found'
                        loading="lazy"
                    />
                    <ImageListItemBar
                        onClick={() => navg(`/book/${book._id}`)}
                        sx={{ width: '13vw' }}
                        title={book.title}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

function Title(){
    
    return (
        <>  
            <Divider />
            <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
                <Grid item xs={10} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h4" sx={{ p: "40px 0 40px 0", fontSize: '40px' }}>Library</Typography>
                    <>
                        <Link underline="hover" variant="h6" sx={{ pr: "3%", justifyContent: "center", alignItems: "center" }}>
                            <Brush size="small"/>
                            Edit
                        </Link>
                    </>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default function Library() {
    const [lib, setLib] = useState([]);

    const fetchData = async () => {
        const resp = await axios.get('/library/api')
        setLib(resp.data.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    var element;
    if (!Object.keys(lib).length) element = <Loading />;
    else element = <BookList lib={lib} />;

    return (
        <PageLayout nav='normal' element={<Title />} gridElem={element} />
    )
}