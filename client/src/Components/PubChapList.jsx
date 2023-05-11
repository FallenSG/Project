import {
    Stack, Typography, Divider, Button, IconButton,
    List, ListItem, ListItemText, ListItemButton,
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@mui/material';
import { ReceiptLongOutlined, Sort, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Comp({ feed, type }) {
    const navg = useNavigate();

    const [sortType, setSortType] = useState(0);
    const [btnClicked, setBtnClicked] = useState({open: false, id: "" });
    
    const defaultMsg = "Once deleted chapter cannot be recovered!!\nDo you want to continue";
    const [dialogMsg, setDialogMsg] = useState({
        msg: defaultMsg,
        type: true
    })

    const [Feed, setFeed] = useState(feed.map((data) => {
        const chapDate = parseInt(data[1].split('_')[1]);
        const DateOup = new Date(chapDate)

        const date = DateOup.toDateString().split(" ").splice(1).join(" ")
        const time = DateOup.toTimeString().split(" ")[0].split(":")

        const finalOut = `${time[0]}:${time[1]} ${date}`
        return [data[0], data[1], finalOut];
    }));

    const compareFnc = (a, b) => {
        if (sortType)
            return a[1] < b[1] ? 1 : -1;

        else
            return a[1] > b[1] ? 1 : -1;
    };

    const sortHandler = () => {
        setSortType((prev) => !prev);
        const sorted = [...Feed].sort(compareFnc);
        setFeed(sorted)
    }

    const handleClose = () => {
        setBtnClicked({ id: "", open: false })
    }

    const handleReq = () => {
        axios.post(`/publish/chapter/delete/${btnClicked.id}?q=${type}`);
        setDialogMsg({
            msg: "Your Request has been submitted.\nThe process will take some time. ",
            type: false
        })
    }

    return (
        <Stack direction="column">
            <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
                <IconButton
                    size="small"
                    onClick={sortHandler}
                >
                    <Sort fontSize="large" />
                </IconButton>
            </div>
            <List>
                {
                    Feed.map((chap) => {
                        const title = chap[0];
                        const chapTime = chap[2];

                        return (<>
                            <ListItem
                                key={chap[1]}
                                secondaryAction={
                                    <IconButton
                                        id={chap[1]}
                                        edge="end"
                                        aria-label="Delete"
                                        onClick={(event) => {
                                            setBtnClicked({ open: true, id: event.currentTarget.id })
                                            setDialogMsg({ msg: defaultMsg, type: true })
                                        }}
                                    >
                                        <Delete />
                                    </IconButton> 
                                }
                                disablePadding
                            >
                                <ListItemButton sx={{ justifyContent: "space-between" }}
                                    onClick={() => {
                                        type === 'draft'?
                                            navg(`/publish/chapter/edit/${chap[1]}`) :
                                            navg(`/chapter/${chap[1]}`)
                                    }}
                                >
                                    <ListItemText>
                                        <Typography sx={{
                                            color: "rgb(26 26 30 / 78%)",
                                            width: "70%",
                                            fontSize: "21px",
                                            lineHeight: "22px",
                                            fontWeight: "550",
                                            textTransform: "capitalize",
                                            fontVariantCaps: "petite-caps",
                                            ml: "5px"
                                        }}>{title}</Typography>
                                    </ListItemText>

                                    <ListItemText sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Typography sx={{
                                            display: { xs: "none", sm: "block" },
                                            color: "rgb(18 18 23 / 60%)",
                                            letterSpacing: "0.5px",
                                            textTransform: "lowercase",
                                            fontSize: { xs: "14px", md: "17px" },
                                            fontWeight: "600",
                                            lineHeight: "18px",
                                            fontVariantCaps: "small-caps",
                                            mr: "10px"
                                        }}
                                        >{chapTime}</Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>)
                    })
                }
            </List>

            <Dialog
                open={btnClicked.open}
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
        </Stack>
    )
}

export default function ChapList({ feed, type="draft" }) {
    if (feed.length)
        return <Comp feed={feed} type={type} />

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

            <Button variant="contained" >Create Now</Button>
        </Stack>
    )
}