import {
    Stack, Link, Typography, Divider, Button, IconButton
} from '@mui/material';
import { ReceiptLongOutlined, Sort } from '@mui/icons-material'; 
import { useState } from 'react';

function Comp({ feed }){
    const [sortType, setSortType] = useState(0);
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
            
            {Feed.map((chap, i) => {
                const title = chap[0];
                const chapTime = chap[2];

                return (
                    <>
                        <div
                            id={chap[1]}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                margin: "7px"
                            }}
                        >
                            <Link
                                underline="hover"
                                href={`/chapter/${chap[1]}`}
                                sx={{
                                    color: "rgb(26 26 30 / 78%)",
                                    fontSize: "21px",
                                    lineHeight: "22px",
                                    fontWeight: "550",
                                    textTransform: "capitalize",
                                    fontVariantCaps: "petite-caps",
                                    ml: "5px"
                                }}
                            >
                                {title}
                            </Link>

                            <Typography
                                sx={{
                                    color: "rgb(18 18 23 / 60%)",
                                    letterSpacing: "0.5px",
                                    textTransform: "lowercase",
                                    fontSize: { xs: "14px", md: "17px" },
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    fontVariantCaps: "small-caps",
                                    mr: "10px"
                                }}
                            >{chapTime}
                            </Typography>
                        </div>
                        <Divider />
                    </>
                )
            })}
        </Stack>
    )
}

export default function ChapList({ feed, type="reader" }){
    if(feed.length)
        return <Comp feed={feed} />

    else if (!feed.length && type === "author") {
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
                <Button variant="outlined">One Click Import</Button>
            </Stack>
        )
    }

    else if(!feed.length && type === "reader"){
        return (
            <Typography variant="h3">
                No Chapter Here.
            </Typography>
        )
    }
}