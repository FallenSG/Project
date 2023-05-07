import { useContext, useState, useEffect, useRef, useCallback } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { 
    Typography, Button, Grid, Stack 
} from '@mui/material';
import {
    Settings, FormatListNumbered, ArrowBackIos, ArrowForwardIos
} from '@mui/icons-material';
import { Parser } from 'html-to-react';
import WebFont from 'webfontloader'
import axios from 'axios'

import { Context, PageLayoutOverload } from "../Components/PageLayout";
import Sidebar from '../Components/ReadingComp';
import { useFetch } from "../customHooks/DataHandler";

const fontFamilies = ['Adamina', 'Abhaya Libre', 'Anaheim', 'Anonymous Pro', 'Barlow Semi'];


function Comp({ UrlUpd }){
    const data = useContext(Context);
    const navg = useNavigate();

    const nextChap = useContext(Context)?.nextChap;
    const prevChap = useContext(Context)?.prevChap;

    const text = Parser().parse(data?.chapter);
    
    const [readStyle, setReadStyle] = useState({ 
        fontSize: 16, open: false, fontFamily: "Adamina", theme: 0, clicked: ""
    });
    const style = { color: "white", cursor: "pointer" }

    const handleUpd = (val) => {
        setReadStyle((prevState) => ({
            ...prevState,
            ...val 
        }))
    }

    const chapHandle = (chapId) => {
        navg(`/chapter/${chapId}`, { replace: true });
        UrlUpd(`/chapter/api/${chapId}`)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // this makes the scrolling smooth
        });
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: fontFamilies
            }
        });
    }, []);


    const observer = useRef();
    const chapEndRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const chapId = data?.bookInfo.publish[1];
                const id = data?.bookInfo._id;
                // console.log("At end", data?.bookInfo.publish[1]);
                axios.post(`/library/storeProgress`, { chapId, id })
                    .then((data) => {})
                    .catch((err) => {})
                
            }
        })
        if (node) observer.current.observe(node)
    }, [data]);

    const Navg = ({ inRef }) => {
        return (    
            <Stack
                ref={inRef}
                direction="row" spacing={3} 
                sx={{ p: "1%", justifyContent: "center" }} 
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIos />}
                    onClick={() => chapHandle(prevChap[1])}
                    disabled={!prevChap}
                >
                    Prev Chapter
                </Button>

                <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIos />}
                    onClick={() => chapHandle(nextChap[1])}
                    disabled={!nextChap}
                >
                    Next Chapter
                </Button>
            </Stack>
        )
    }

    return (
        <Grid container sx={{ justifyContent: "center", backgroundColor: `${readStyle.theme[1]}`, pb: "3%" }}>
            <Grid item xs={12}>
                <Navg />
            </Grid>
            <Grid item 
                xs={12} sm={10} md={8} 
                sx={{ 
                    border: { xs: "", sm: "1px #726b57 ridge" }, position: "realtive" 
                }}
            >
                <Typography variant="body1" 
                    sx={{ 
                        fontSize: `${readStyle.fontSize}px`, 
                        fontFamily: readStyle.fontFamily, 
                        p: "5%", 
                        backgroundColor: `${readStyle.theme[0]}`, 
                        color: `${readStyle.theme[2]}`
                    }}>
                    {text}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Navg inRef={chapEndRef} />
            </Grid>

            <Stack spacing={2} direction={{ xs:"row", sm: "column" }}
                sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    position: { xs: "sticky", sm: "fixed" },
                    p: {xs: "2.5% 0", sm: "0 1%" },
                    top: 0,
                    bottom: 0,
                    right: 0,
                    height: { xs: "inherit", sm: "100%" },
                    width: { xs: "100%", sm: "2%" },
                    backgroundColor: "#383535"
                }}>
                <Settings onClick={() => handleUpd({open: true, clicked: "setting"})}
                    sx={style} />
                <FormatListNumbered onClick={() => handleUpd({ open: true, clicked: "chapter" })}
                    sx={style} />
            </Stack>
            <Sidebar readStyle={readStyle} handleUpd={handleUpd} UrlUpd={UrlUpd}/>
        </Grid>
    )
}

export default function ChapReading(){
    const chapId = useLocation().pathname.split('/')[2];
    const [url, setUrl] = useState(`/chapter/api/${chapId}`)

    const info = useFetch(url)

    const UrlUpd = (url) => {
        setUrl(url);
    }
    return (
        <PageLayoutOverload
            nav="read"
            elem={<Comp UrlUpd={UrlUpd}/>}
            contextInfo={info}
        />
    )
}