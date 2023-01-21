import { ImageList, ImageListItem, ImageListItemBar, Grid, Typography, Divider, Link } from '@mui/material'
import { Brush } from '@mui/icons-material';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageLayout, Context} from '../Components/PageLayout';

function BookList(){
    const navg = useNavigate()
    const lib = useContext(Context);

    return (
        <ImageList
            sx={{ height: 'inherit', pt: '10px' }}
            cols={5}
            spacing={10}
        >
            {lib.map((book) => (
                <ImageListItem key={book._id}>
                    <img
                        onClick={() => navg(`/book/${book._id}`)}
                        src={"/bookCover/d73121ac45881355f5a7969f98bf89f9"}//book.img
                        sx={{ overflow: 'hidden', borderRadius: '5px' }}
                        alt='Not Found'
                        loading="lazy"
                    />
                    <ImageListItemBar
                        onClick={() => navg(`/book/${book._id}`)}
                        sx={{ width: '15vw' }}
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
    return (
        <PageLayout 
            url="/library/api" 
            elem={<Title />} 
            gridElem={<BookList />}
            failureMsg= "Your Library is Empty"
        />
    )
}
