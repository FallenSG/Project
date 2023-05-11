import { useContext, useState } from 'react'
import { Paper, Grid, Typography,
    Button, Box, Divider, Menu, MenuItem, Dialog, 
    DialogActions, DialogContent, DialogTitle, DialogContentText 
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { PageLayout, Context } from '../Components/PageLayout'

function Info({ feed }){
    let rating = (feed.totalRating / feed.ratingCount).toFixed(2)
    rating = rating > 0 ? rating : 0;
    const [anchorEl, setAnchorEl] = useState(null);

    const bookMenu = async(event) => {
        return setAnchorEl(event.currentTarget);
    }

    return (
        <Grid 
            container
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
        >
            <Grid item xs={3}><Typography variant="h6">{feed.title}</Typography></Grid>
            <Grid item xs={1}><Typography>{rating}</Typography></Grid>
            <Grid item xs={1}><Typography>{feed.ratingCount}</Typography></Grid>
            <Grid item xs={4} 
                sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>            
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
                    onClick={bookMenu}
                    >...</Button>
                <BookMenu
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    id={feed._id}
                />
            </Grid>
        </Grid>
    )
}

function BookTab({ feed }){

    return (
        <Box sx={{ flewGrow: 1 }}>
            <Grid 
                item container
                direction="row"
                key={feed._id}
                alignItems="center"
            >   
                <Grid item xs={2}>
                    <img
                        style={{
                            // height: "30vh",
                            width: "12vw",
                            aspectRatio: "0.8",
                            resize: "auto",
                            objectFit: "scale-down",
                            paddingTop: "5px"
                        }}
                        src={feed.img}
                    />
                </Grid>
                <Grid item xs={10}> <Info feed={feed} /> </Grid>
            </Grid>
        </Box>
    )
}

function BookMenu({ anchorEl, setAnchorEl, id }){
    const nav = useNavigate();
    const isMenuOpen = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
    const [ dialogMsg, setDialogMsg ] = useState({
        msg: "You cannot recover it once deleted!!\nDo you want to continue??",
        type: true
    })

    const handleClose = () => {
        setOpen(false);
    }

    const handleReq = () => {
        axios.post(`/publish/delete/${id}`);
        setDialogMsg({
            msg: "Your Request has been submitted.\nThe process will take some time. ",
            type: false
        })
    }

    return (
        <>
        <Menu
            anchorEl={anchorEl}
            id='bookMenu'
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    '& .MuiAvatar-root': {
                        bgcolor: "#25262f",
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => nav(`/publish/modify/${id}`)}>Modify Book</MenuItem>
            <MenuItem onClick={() => nav(`/publish/chapter/create/${id}`)}>Create a Chapter</MenuItem>
            <MenuItem onClick={() => setOpen(true)}>Delete</MenuItem>
        </Menu>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Are You Sure</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogMsg.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>{
                dialogMsg.type ? <> 
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleReq}>Continue</Button>
                </> : <Button onClick={handleClose}>Close</Button>
            }</DialogActions>
        </Dialog>
        </>

    )
}

function Comp(){
    const bookList = useContext(Context).book_id;

    return (
        <Paper sx={{ backgroundColor: "#f6f7fc" }}>
            <Grid 
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ p: "1% 0", color: "rgb(18 18 23 / 60%)" }}
            >
                <Grid item xs={4} sx={{ display:"flex", justifyContent: "center" }}><Typography>Name</Typography></Grid>
                <Divider orientation='vertical' flexItem  />
                <Grid item xs={1}><Typography>Rating</Typography></Grid>
                <Divider orientation='vertical' flexItem  />
                <Grid item xs={1}><Typography>Rating Count</Typography></Grid>
                <Divider orientation='vertical' flexItem  />
                <Grid item xs={3} sx={{ display:"flex", justifyContent: "center" }}><Typography>Operations</Typography></Grid>
            </Grid>
            <Divider />
            {bookList.map((book) => {
                return (<>
                    <BookTab feed={book}/>
                    <Divider />
                </>)
                    
            })}
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
            gridXs={11}
        />
    )
}